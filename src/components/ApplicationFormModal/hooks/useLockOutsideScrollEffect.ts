import { useEffect } from 'react';

interface UseLockOutsideScrollEffectProps {
  enabled: boolean;
}

export function useLockOutsideScrollEffect({
  enabled,
}: UseLockOutsideScrollEffectProps) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [enabled]);
}
