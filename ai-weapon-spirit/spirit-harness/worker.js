// Game-owned compatibility boundary. The copied native Worker stays byte-identical.
import { installHarnessBrowserCompat, inspectHarnessBrowserCapabilities } from './browser-compat.mjs';
import { installHarnessThinkingPolicy } from './thinking-policy.mjs';
const pending = [];
const buffer = event => { pending.push(event); event.stopImmediatePropagation(); };
addEventListener('message', buffer);
try {
  installHarnessBrowserCompat();
  const capabilities = inspectHarnessBrowserCapabilities();
  if (!capabilities.supported) {
    postMessage({ type: 'spirit-host-unavailable', missing: capabilities.missing });
  } else {
    installHarnessThinkingPolicy();
    // The page waits for this handshake before sending the official init message.
    await import('./native-worker.js');
    removeEventListener('message', buffer);
    postMessage({ type: 'spirit-host-ready' });
    // Preserve the official direct-connect contract for other native clients too.
    for (const event of pending) dispatchEvent(new MessageEvent('message', { data: event.data, ports: event.ports }));
    pending.length = 0;
  }
} catch {
  postMessage({ type: 'spirit-host-unavailable', missing: ['Worker module'] });
}
