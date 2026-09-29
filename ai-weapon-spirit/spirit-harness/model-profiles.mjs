/** Connection capabilities, not character/game content. Shared by UI, VFS and Worker. */
export const MODEL_PROFILE_REVISION = '2026-09-29.1';
export const MIN_CONTEXT_WINDOW = 16384;
export const MAX_CONTEXT_WINDOW = 2000000;
export const NATIVE_REASONING_EFFORTS = Object.freeze(['low', 'high', 'max']);
export const MODEL_FAMILIES = Object.freeze(['deepseek', 'claude', 'openai', 'other']);

// Specific model rules precede family fallbacks. An unknown model's family preset
// is a visible budgeting assumption, never a claim that a gateway was probed.
const rules = [
  { id: 'claude-opus-5-5', match: /^claude-opus-5-5(?:-\d{8})?$/, family: 'claude', thinking: 'adaptive', requiredThinking: true, summarizedThinking: true, boundThinking: true, contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-sonnet-5-5', match: /^claude-sonnet-5-5(?:-\d{8})?$/, family: 'claude', thinking: 'adaptive', requiredThinking: true, summarizedThinking: true, boundThinking: true, contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-new-adaptive', match: /^claude-(?:opus-(?:5|4-[78])|sonnet-5)(?:-\d{8})?$/, family: 'claude', thinking: 'adaptive', summarizedThinking: true, contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-opus-4-6', match: /^claude-opus-4-6(?:-\d{8})?$/, family: 'claude', thinking: 'adaptive', contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-sonnet-4-6', match: /^claude-sonnet-4-6(?:-\d{8})?$/, family: 'claude', thinking: 'adaptive', contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-budgeted', match: /^claude-(?:opus-4(?:-[15])?|sonnet-4(?:-5)?|haiku-4-5|3-7-sonnet)(?:-\d{8})?$/, family: 'claude', thinking: 'budgeted', contextWindow: 200000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
  { id: 'claude-without-thinking', match: /^claude-(?:3(?:-[05])?-(?:opus|sonnet|haiku)|2(?:\.[01])?|instant-1(?:\.2)?)(?:-\d{8})?$/, family: 'claude', thinking: 'none', contextWindow: 200000, contextSource: 'family', efforts: [] },
  { id: 'deepseek-current', match: /^deepseek-(?:flash|v4-pro|v4-flash(?:-vision-exp)?)$/, family: 'deepseek', thinking: 'native', contextWindow: 1000000, contextSource: 'model', efforts: NATIVE_REASONING_EFFORTS },
];

function modelKey(model) {
  // Common gateway namespaces identify the provider; arbitrary suffixes do not
  // inherit the capabilities of a known model (e.g. a custom distilled variant).
  return String(model ?? '').trim().toLowerCase().replace(/^(?:anthropic|deepseek|openai)\//, '')
    .replace(/(claude-(?:opus|sonnet|haiku)-\d+)\.(\d+)/, '$1-$2');
}
export function resolveModelProfile(model) {
  const key = modelKey(model);
  const rule = rules.find(row => row.match.test(key));
  if (rule) {
    const { match, ...profile } = rule;
    return { requiredThinking: false, ...profile };
  }
  const family = key.startsWith('deepseek-') ? 'deepseek' : key.startsWith('claude-') ? 'claude'
    : /^(?:gpt-|o[134](?:-|$)|chatgpt-)/.test(key) ? 'openai' : 'other';
  return { id: `${family}-fallback`, family, thinking: 'native', requiredThinking: false,
    contextWindow: family === 'claude' ? 200000 : family === 'deepseek' ? 128000 : 32768,
    contextSource: family === 'claude' || family === 'deepseek' ? 'family' : 'fallback', efforts: NATIVE_REASONING_EFFORTS };
}

/** Only user-entered overrides are saved. Derived defaults follow model changes. */
export function modelPreferences(input = {}) {
  return {
    ...(Number.isSafeInteger(input.contextWindow) && input.contextWindow >= MIN_CONTEXT_WINDOW && input.contextWindow <= MAX_CONTEXT_WINDOW ? { contextWindow: input.contextWindow } : {}),
    ...(typeof input.thinkingEnabled === 'boolean' ? { thinkingEnabled: input.thinkingEnabled } : {}),
    ...(NATIVE_REASONING_EFFORTS.includes(input.reasoningEffort) ? { reasoningEffort: input.reasoningEffort } : {}),
  };
}

export function resolveModelSettings(input = {}) {
  const profile = resolveModelProfile(input.model);
  const preferences = modelPreferences(input);
  const thinkingEnabled = profile.thinking !== 'none' && (profile.requiredThinking || preferences.thinkingEnabled !== false);
  const effort = profile.efforts.includes(preferences.reasoningEffort) ? preferences.reasoningEffort : 'low';
  const contextWindow = preferences.contextWindow ?? profile.contextWindow;
  return { profile, contextWindow,
    contextSource: preferences.contextWindow === undefined ? profile.contextSource : 'manual',
    thinkingEnabled, reasoningEffort: thinkingEnabled ? effort : 'off',
    // Thinking shares the completion budget. The old 2048-token ceiling often
    // left no room for the spoken answer after a reasoning block.
    maxTokens: thinkingEnabled ? Math.min(({ low: 8192, high: 16384, max: 32768 })[effort], Math.floor(contextWindow / 2)) : 2048 };
}

export const LEGACY_THINKING_BUDGETS = Object.freeze({ low: 1024, high: 4096, max: 8192 });
