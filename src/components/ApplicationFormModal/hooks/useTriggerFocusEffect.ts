import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseTriggerFocusEffectProps {
  enabled: boolean;
  targetRef: RefObject<HTMLElement>;
  delay?: number;
}

export function useTriggerFocusEffect({
  enabled,
  targetRef,
  delay = 0,
}: UseTriggerFocusEffectProps) {
  useEffect(() => {
    if (enabled) {
      const timeoutId = setTimeout(() => {
        targetRef.current?.focus();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [enabled, targetRef, delay]);
}
