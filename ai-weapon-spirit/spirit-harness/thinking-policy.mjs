import { resolveModelProfile, LEGACY_THINKING_BUDGETS } from './model-profiles.mjs';

export function usesAdaptiveThinking(model) {
  return resolveModelProfile(model).thinking === 'adaptive';
}

/** Keep the upstream transport/parser; translate only known Messages capabilities. */
export function adaptThinkingRequest(body) {
  const profile = resolveModelProfile(body.model);
  if (profile.thinking === 'native') return body;
  // Upstream intentionally drops signature metadata on a model change. Claude
  // cannot replay unsigned thinking, so omit only those blocks in this request
  // projection; all original Session events, text and tool exchanges survive.
  let projected = body;
  if (profile.family === 'claude' && Array.isArray(body.messages)) {
    let changed = false;
    const messages = body.messages.flatMap(message => {
      if (message.role !== 'assistant' || !Array.isArray(message.content)) return [message];
      const content = message.content.filter(block => block.type !== 'thinking' || (typeof block.signature === 'string' && block.signature.length > 0));
      if (content.length === message.content.length) return [message];
      changed = true;
      return content.length ? [{ ...message, content }] : [];
    });
    if (changed) projected = { ...body, messages };
  }
  if (body.thinking?.type === 'disabled' && !profile.requiredThinking) return projected;
  const next = { ...projected };
  const effort = profile.efforts.includes(body.output_config?.effort) ? body.output_config.effort : 'low';
  if (profile.thinking === 'adaptive') {
    next.thinking = { type: 'adaptive', ...(profile.summarizedThinking ? { display: 'summarized' } : {}),
      ...(profile.boundThinking ? { block_binding: { prefix_mismatch_behavior: 'drop_block' } } : {}) };
    next.output_config = { ...body.output_config, effort };
  } else {
    const output = { ...body.output_config }; delete output.effort;
    if (Object.keys(output).length) next.output_config = output;
    else delete next.output_config;
    if (profile.thinking === 'none') next.thinking = { type: 'disabled' };
    else {
      const budget = Math.min(LEGACY_THINKING_BUDGETS[effort], Math.max(1024, (body.max_tokens ?? 8192) - 2048));
      next.thinking = { type: 'enabled', budget_tokens: budget };
      next.max_tokens = Math.max(body.max_tokens ?? 0, budget + 2048);
    }
  }
  // Claude thinking cannot be combined with the map-intent sampling override.
  if (profile.family === 'claude' && next.thinking.type !== 'disabled') {
    delete next.temperature; delete next.top_p; delete next.top_k;
  }
  return next;
}

const installations = new WeakMap();

/**
 * The unchanged upstream adapter emits disabled/enabled thinking. Adapt only its
 * Messages JSON request using the same capability registry as settings. Install in
 * the dedicated Harness Worker before loading upstream; never on the game page.
 * Response streaming, cancellation, credentials, destinations and retry stay native.
 */
export function installHarnessThinkingPolicy(scope = globalThis) {
  const existing = installations.get(scope);
  if (existing) return existing;
  const original = scope.fetch;
  const replacement = function (input, init) {
    let next = init;
    if (init?.method?.toUpperCase() === 'POST' && typeof init.body === 'string') {
      let url;
      try { url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url); }
      catch { /* Non-provider URLs keep the original fetch behavior. */ }
      const headers = new Headers(init.headers);
      if (url?.pathname.endsWith('/v1/messages') && headers.has('x-deepseek-harness-user-id')
        && headers.get('content-type')?.split(';')[0].trim() === 'application/json') {
        let body;
        try { body = JSON.parse(init.body); } catch { /* Let native transport report malformed JSON. */ }
        if (body && typeof body === 'object' && !Array.isArray(body)) {
          const adapted = adaptThinkingRequest(body);
          if (adapted !== body) {
            next = { ...init, body: JSON.stringify(adapted) };
            if (adapted.thinking?.block_binding) {
              const beta = 'thinking-binding-controls-2026-08-01';
              const current = headers.get('anthropic-beta')?.split(',').map(value => value.trim()).filter(Boolean) ?? [];
              if (!current.includes(beta)) current.push(beta);
              headers.set('anthropic-beta', current.join(','));
              next.headers = headers;
            }
          }
        }
      }
    }
    return original.call(scope, input, next);
  };
  scope.fetch = replacement;
  const dispose = () => {
    if (scope.fetch === replacement) scope.fetch = original;
    installations.delete(scope);
  };
  installations.set(scope, dispose);
  return dispose;
}
