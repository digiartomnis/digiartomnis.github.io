/** Browser host compatibility; installed before the unchanged official Harness bundles. */
const MAX_LENGTH = 0x1fffffffffffff;
function integer(value) {
  if (typeof value === 'bigint') throw new TypeError('Cannot convert a BigInt value to a number');
  const number = Number(value);
  return Number.isNaN(number) || number === 0 ? 0 : Math.trunc(number);
}
const lengthOf = object => Math.min(MAX_LENGTH, Math.max(0, integer(object.length)));
function nativeSignalGetter(scope, name) {
  let prototype = scope.AbortSignal.prototype;
  while (prototype) {
    const getter = Object.getOwnPropertyDescriptor(prototype, name)?.get;
    if (getter) return getter;
    prototype = Object.getPrototypeOf(prototype);
  }
  throw new TypeError(`Native AbortSignal.${name} getter unavailable`);
}
function receiver(value) {
  if (value === null || value === undefined) throw new TypeError('Array method called on null or undefined');
  return Object(value);
}

export function installHarnessBrowserCompat(scope = globalThis) {
  const installed = [];
  const add = (object, key, value, name, writable = true) => {
    if (object[key] !== undefined) return;
    Object.defineProperty(object, key, { value, configurable: writable, writable });
    installed.push(name);
  };
  const P = scope.Promise, A = scope.Array, S = scope.Symbol;
  normalizeHarnessIntrinsicSource(scope, installed);
  // Native Messages SSE uses for-await. Some Safari versions expose web streams
  // but not their async iterator. Adapt the native reader, never buffer a reply
  // or replace fetch/streams/the upstream parser.
  if (scope.ReadableStream && S.asyncIterator) {
    const prototype = scope.ReadableStream.prototype;
    const values = prototype.values ?? prototype[S.asyncIterator] ?? streamValues(scope);
    add(prototype, 'values', values, 'ReadableStream.prototype.values');
    add(prototype, S.asyncIterator, values, 'ReadableStream.prototype[Symbol.asyncIterator]');
  }
  add(P, 'withResolvers', function withResolvers() {
    let resolve, reject;
    const promise = new this((yes, no) => {
      if (resolve !== undefined || reject !== undefined) throw new TypeError('Promise capability executor called more than once');
      resolve = yes; reject = no;
    });
    if (typeof resolve !== 'function' || typeof reject !== 'function') throw new TypeError('Invalid promise capability');
    return { promise, resolve, reject };
  }, 'Promise.withResolvers');
  for (const name of ['dispose', 'asyncDispose']) add(S, name, S.for(`Symbol.${name}`), `Symbol.${name}`, false);
  add(A.prototype, 'at', function at(index) {
    const object = receiver(this), length = lengthOf(object), relative = integer(index);
    const offset = relative >= 0 ? relative : length + relative;
    return offset < 0 || offset >= length ? undefined : object[offset];
  }, 'Array.prototype.at');
  add(A.prototype, 'toReversed', function toReversed() {
    const object = receiver(this), length = lengthOf(object), result = new A(length);
    for (let index = 0; index < length; index++) result[index] = object[length - index - 1];
    return result;
  }, 'Array.prototype.toReversed');
  add(A.prototype, 'toSpliced', function toSpliced(start, deleteCount, ...items) {
    const object = receiver(this), length = lengthOf(object), relative = integer(start);
    const begin = relative < 0 ? Math.max(length + relative, 0) : Math.min(relative, length);
    const removed = arguments.length === 0 ? 0 : arguments.length === 1 ? length - begin
      : Math.min(Math.max(integer(deleteCount), 0), length - begin);
    const size = length + items.length - removed;
    if (size > MAX_LENGTH) throw new TypeError('Invalid array length');
    const result = new A(size);
    let output = 0;
    for (; output < begin; output++) result[output] = object[output];
    for (const item of items) result[output++] = item;
    for (let index = begin + removed; index < length; index++) result[output++] = object[index];
    return result;
  }, 'Array.prototype.toSpliced');
  add(A.prototype, 'findLast', function findLast(predicate, thisArg) {
    const object = receiver(this), length = lengthOf(object);
    if (typeof predicate !== 'function') throw new TypeError('Predicate must be a function');
    for (let index = length - 1; index >= 0; index--) {
      const value = object[index];
      if (predicate.call(thisArg, value, index, object)) return value;
    }
    return undefined;
  }, 'Array.prototype.findLast');
  if (scope.AbortSignal && scope.AbortController) {
    const aborted = nativeSignalGetter(scope, 'aborted'), reason = nativeSignalGetter(scope, 'reason');
    add(scope.AbortSignal.prototype, 'throwIfAborted', function throwIfAborted() {
      if (aborted.call(this)) throw reason.call(this);
    }, 'AbortSignal.prototype.throwIfAborted');
    add(scope.AbortSignal, 'any', createAbortAny(scope), 'AbortSignal.any');
  }
  return { installed };
}

function streamValues(scope) {
  const getReader = scope.ReadableStream.prototype.getReader;
  return function values(options = {}) {
    if (options != null && typeof options !== 'object' && typeof options !== 'function')
      throw new TypeError('Stream iterator options must be a dictionary');
    const preventCancel = !!options?.preventCancel;
    const reader = getReader.call(this); // Acquire/validate immediately, like native values().
    let finished = false, pending = scope.Promise.resolve();
    const enqueue = operation => {
      const result = pending.then(operation);
      pending = result.catch(() => {});
      return result;
    };
    return {
      next() {
        return enqueue(async () => {
          if (finished) return { done: true, value: undefined };
          try {
            const result = await reader.read();
            if (result.done) { finished = true; reader.releaseLock(); }
            return result;
          } catch (error) { finished = true; reader.releaseLock(); throw error; }
        });
      },
      return(value) {
        return enqueue(async () => {
          if (!finished) {
            finished = true;
            try { if (!preventCancel) await reader.cancel(value); }
            finally { reader.releaseLock(); }
          }
          return { done: true, value };
        });
      },
      [scope.Symbol.asyncIterator]() { return this; },
    };
  };
}

/**
 * Harness 0.1.7-rc.2 dsh-util-values compares the native Object/Array source to
 * V8's exact spacing. WebKit emits line breaks, rejecting ordinary JSON before
 * a Session can be created. Keep upstream bytes and validation unchanged: adapt
 * the two captured intrinsic identities only, preserving every other function.
 * Remove this narrowly scoped bridge when upstream accepts native whitespace.
 */
function normalizeHarnessIntrinsicSource(scope, installed) {
  const prototype = scope.Function.prototype, original = prototype.toString;
  const normalized = new Map();
  for (const [constructor, name] of [[scope.Object, 'Object'], [scope.Array, 'Array']]) {
    const source = original.call(constructor), canonical = `function ${name}() { [native code] }`;
    if (source !== canonical && source.replace(/\s+/g, ' ').trim() === canonical)
      normalized.set(constructor, canonical);
  }
  if (!normalized.size) return;
  Object.defineProperty(prototype, 'toString', { configurable: true, writable: true,
    value: function toString() { return normalized.get(this) ?? original.call(this); } });
  installed.push('Harness intrinsic source formatting');
}

function createAbortAny(scope) {
  // A long-lived parent must not retain abandoned dependent signals forever.
  const controllers = new WeakMap();
  const finalizer = typeof scope.FinalizationRegistry === 'function'
    ? new scope.FinalizationRegistry(cleanup => cleanup()) : undefined;
  return function any(signals) {
    if (signals === null || signals === undefined || typeof signals[Symbol.iterator] !== 'function')
      throw new TypeError('AbortSignal.any expects an iterable of AbortSignals');
    const inputs = Array.from(signals);
    const getter = nativeSignalGetter(scope, 'aborted');
    for (const signal of inputs) {
      getter.call(signal);
    }
    const controller = new scope.AbortController(), output = controller.signal;
    for (const signal of inputs) if (signal.aborted) { controller.abort(signal.reason); return output; }
    if (!inputs.length) return output;
    controllers.set(output, controller);
    const weak = typeof scope.WeakRef === 'function' ? new scope.WeakRef(output) : { deref: () => output };
    const listeners = [], token = {};
    const cleanup = abortCleanup(listeners, finalizer, token);
    for (const signal of new Set(inputs)) {
      const callback = abortListener(signal, weak, controllers, cleanup);
      signal.addEventListener('abort', callback, { once: true });
      listeners.push([signal, callback]);
    }
    finalizer?.register(output, cleanup, token);
    return output;
  };
}
function abortCleanup(listeners, finalizer, token) {
  return () => {
    for (const [signal, callback] of listeners) signal.removeEventListener('abort', callback);
    listeners.length = 0; finalizer?.unregister(token);
  };
}
function abortListener(signal, weak, controllers, cleanup) {
  return () => {
    const target = weak.deref(), owner = target && controllers.get(target);
    cleanup();
    if (owner && !target.aborted) { owner.abort(signal.reason); controllers.delete(target); }
  };
}

/** Required platform features have real storage/stream semantics; they are never faked. */
export function inspectHarnessBrowserCapabilities(scope = globalThis) {
  const missing = [];
  const requireFunction = (name, value) => { if (typeof value !== 'function') missing.push(name); };
  if (scope.isSecureContext === false) missing.push('HTTPS');
  requireFunction('structuredClone', scope.structuredClone);
  requireFunction('IndexedDB', scope.indexedDB?.open);
  requireFunction('Web Locks', scope.navigator?.locks?.request);
  for (const name of ['ReadableStream', 'WritableStream', 'TransformStream', 'TextEncoder', 'TextDecoder', 'TextDecoderStream', 'AbortController', 'AbortSignal'])
    requireFunction(name, scope[name]);
  requireFunction('ReadableStream async iteration', scope.ReadableStream?.prototype?.[scope.Symbol.asyncIterator]);
  if (typeof scope.DecompressionStream !== 'function') missing.push('DecompressionStream(gzip)');
  else { try { new scope.DecompressionStream('gzip'); } catch { missing.push('DecompressionStream(gzip)'); } }
  return { supported: missing.length === 0, missing };
}
