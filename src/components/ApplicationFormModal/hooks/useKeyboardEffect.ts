import { useEffect } from 'react';

/**
 * 키보드 이벤트 핸들러들을 정의하는 인터페이스
 */
interface KeyboardHandlers {
  /** ESC 키 눌렀을 때 실행할 함수 */
  onEscape?: () => void;
  /** Tab 키 눌렀을 때 실행할 함수 */
  onTab?: (e: KeyboardEvent) => void;
  /** Shift+Tab 키 눌렀을 때 실행할 함수 */
  onShiftTab?: (e: KeyboardEvent) => void;
}

/**
 * useKeyboardEffect 훅의 props 인터페이스
 */
interface UseKeyboardEffectProps {
  /** 키보드 이벤트 핸들러들 */
  handlers: KeyboardHandlers;
}

/**
 * 키보드 이벤트를 처리하는 커스텀 훅
 * ESC, Tab, Shift+Tab 키에 대한 핸들러를 등록하고 관리합니다.
 *
 * @param handlers - 키보드 이벤트 핸들러 객체
 */
export function useKeyboardEffect({ handlers }: UseKeyboardEffectProps) {
  useEffect(() => {
    /**
     * 키보드 이벤트를 처리하는 핸들러 함수
     * @param e - 키보드 이벤트 객체
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          // ESC 키가 눌렸을 때 핸들러 실행
          handlers.onEscape?.();
          break;
        case 'Tab':
          if (e.shiftKey) {
            // Shift+Tab 키 조합이 눌렸을 때
            handlers.onShiftTab?.(e);
          } else {
            // Tab 키만 눌렸을 때
            handlers.onTab?.(e);
          }
          break;
      }
    };

    // 문서 전체에 키보드 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
}
