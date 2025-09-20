import { useEffect } from 'react';

/**
 * useLockOutsideScrollEffect 훅의 props 인터페이스
 */
interface UseLockOutsideScrollEffectProps {
  /** 스크롤 잠금 활성화 여부 */
  enabled: boolean;
}

/**
 * 외부 스크롤을 잠그는 커스텀 훅
 * 모달이 열려있을 때 배경 페이지의 스크롤을 방지하여 접근성을 향상시킵니다.
 *
 * @param enabled - 스크롤 잠금 활성화 여부
 */
export function useLockOutsideScrollEffect({
  enabled,
}: UseLockOutsideScrollEffectProps) {
  useEffect(() => {
    if (enabled) {
      // 스크롤 잠금이 활성화되면 body의 overflow를 hidden으로 설정
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 잠금이 비활성화되면 overflow 스타일 초기화
      document.body.style.overflow = '';
    }

    // 컴포넌트 언마운트 시 overflow 스타일 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, [enabled]);
}
