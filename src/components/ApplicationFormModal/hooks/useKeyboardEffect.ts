import { useEffect } from 'react';

interface KeyboardHandlers {
  onEscape?: () => void;
  onTab?: (e: KeyboardEvent) => void;
  onShiftTab?: (e: KeyboardEvent) => void;
}

interface UseKeyboardEffectProps {
  handlers: KeyboardHandlers;
}

export function useKeyboardEffect({ handlers }: UseKeyboardEffectProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handlers.onEscape?.();
          break;
        case 'Tab':
          if (e.shiftKey) {
            handlers.onShiftTab?.(e);
          } else {
            handlers.onTab?.(e);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
}
