import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * useTriggerFocusEffect 훅의 props 인터페이스
 */
interface UseTriggerFocusEffectProps {
  /** 포커스 트리거 활성화 여부 */
  enabled: boolean;
  /** 포커스를 받을 대상 요소의 ref */
  targetRef: RefObject<HTMLElement>;
  /** 포커스를 설정하기 전 지연 시간 (밀리초) */
  delay?: number;
}

/**
 * 특정 요소에 포커스를 트리거하는 커스텀 훅
 * 모달이 열릴 때 특정 요소로 포커스를 이동시키는 등의 접근성 기능을 제공합니다.
 *
 * @param enabled - 포커스 트리거 활성화 여부
 * @param targetRef - 포커스를 받을 대상 요소의 ref
 * @param delay - 포커스를 설정하기 전 지연 시간 (기본값: 0ms)
 */
export function useTriggerFocusEffect({
  enabled,
  targetRef,
  delay = 0,
}: UseTriggerFocusEffectProps) {
  useEffect(() => {
    if (enabled) {
      // 지정된 지연 시간 후 대상 요소에 포커스 설정
      const timeoutId = setTimeout(() => {
        targetRef.current?.focus();
      }, delay);

      // 컴포넌트 언마운트 시 또는 의존성 변경 시 타이머 정리
      return () => clearTimeout(timeoutId);
    }
  }, [enabled, targetRef, delay]);
}
