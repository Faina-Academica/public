import { useState, useEffect, useRef } from 'react';

// ── Global load gate ──────────────────────────────────────────
// Limits concurrent image fetches to avoid triggering rate limits.
const MAX_CONCURRENT = 2;
const MAX_RETRIES    = 4;
let active = 0;
const waiting = []; // [{ fn, cancelled }]

function dequeue() {
  while (active < MAX_CONCURRENT && waiting.length > 0) {
    const entry = waiting.shift();
    if (entry.cancelled) continue;
    active++;
    entry.fn();
  }
}

function releaseSlot() {
  active = Math.max(0, active - 1);
  dequeue();
}

// ── Component ─────────────────────────────────────────────────
export default function QueuedImage({ src, alt, className, onHide }) {
  const [liveSrc, setLiveSrc] = useState(null); // null=waiting, string=loading, false=hidden
  const attemptRef = useRef(0);
  const heldRef    = useRef(false);
  const timerRef   = useRef(null);
  const aliveRef   = useRef(true);

  useEffect(() => {
    aliveRef.current  = true;
    attemptRef.current = 0;

    const entry = {
      cancelled: false,
      fn: () => {
        heldRef.current = true;
        setLiveSrc(src);
      },
    };
    waiting.push(entry);
    dequeue();

    return () => {
      aliveRef.current = false;
      clearTimeout(timerRef.current);
      entry.cancelled = true;
      if (heldRef.current) {
        heldRef.current = false;
        releaseSlot();
      }
    };
  }, [src]);

  function handleLoad() {
    heldRef.current = false;
    releaseSlot();
  }

  function handleError() {
    heldRef.current = false;
    releaseSlot();

    const attempt = attemptRef.current;
    if (attempt < MAX_RETRIES && aliveRef.current) {
      attemptRef.current++;
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) return;
        const retryEntry = {
          cancelled: false,
          fn: () => {
            heldRef.current = true;
            const sep = src.includes('?') ? '&' : '?';
            setLiveSrc(`${src}${sep}_r=${attemptRef.current}`);
          },
        };
        waiting.push(retryEntry);
        dequeue();
      }, 1500 * 2 ** attempt); // 1.5s → 3s → 6s → 12s
    } else {
      setLiveSrc(false);
      onHide?.();
    }
  }

  if (!liveSrc) return null;

  return (
    <img
      src={liveSrc}
      alt={alt ?? ''}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
