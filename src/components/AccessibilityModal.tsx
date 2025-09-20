import type { ReactNode, RefObject } from "react";

import { useKeyboardEffect } from "./ApplicationFormModal/hooks/useKeyboardEffect";
import { useLockOutsideScrollEffect } from "./ApplicationFormModal/hooks/useLockOutsideScrollEffect";
import { useRef } from "react";
import { useTriggerFocusEffect } from "./ApplicationFormModal/hooks/useTriggerFocusEffect";

/**
 * AccessibilityModal 컴포넌트의 props 인터페이스
 */
interface AccessibilityModalProps {
  /** 모달 열림/닫힘 상태 */
  isOpen: boolean;
  /** 모달 닫기 콜백 함수 */
  onClose: () => void;
  /** 모달 내부 콘텐츠 */
  children: ReactNode;
  /** 모달 제목 (접근성 라벨링용) */
  title: string;
  /** 모달 설명 (선택사항, 접근성 설명용) */
  description?: string;
}

/**
 * 완전한 접근성을 지원하는 모달 컴포넌트
 *
 * 주요 접근성 기능:
 * - 포커스 트랩 (Tab 키 순환)
 * - ESC 키로 닫기
 * - 배경 클릭으로 닫기
 * - 배경 스크롤 방지
 * - 스크린 리더를 위한 ARIA 속성
 * - prefers-reduced-motion 지원
 * - 모달 열림/닫힘 시 포커스 관리
 *
 * @param isOpen - 모달 열림/닫힘 상태
 * @param onClose - 모달 닫기 콜백 함수
 * @param children - 모달 내부 콘텐츠
 * @param title - 모달 제목
 * @param description - 모달 설명 (선택사항)
 */
const AccessibilityModal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}: AccessibilityModalProps) => {
  // 모달 컨테이너와 제목 요소, 트리거 요소 참조
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  // 모달이 열릴 때 트리거 요소 저장
  if (isOpen && !modalTriggerRef.current) {
    modalTriggerRef.current = document.activeElement as HTMLElement;
  }

  /**
   * Tab 키 포커스 트랩 핸들러
   * 마지막 요소에서 Tab 시 첫 번째 요소로 이동
   */
  const handleTab = (e: KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      "[tabindex], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [href]"
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const elementsArray = Array.from(focusableElements) as HTMLElement[];
    const currentIndex = elementsArray.findIndex(
      (el) => el === document.activeElement
    );

    if (currentIndex === elementsArray.length - 1) {
      // 마지막 요소에서 Tab -> 첫 번째 요소로 (트랩 필요)
      e.preventDefault();
      elementsArray[0].focus();
    }
    // 그 외에는 브라우저 기본 동작 허용
  };

  /**
   * Shift+Tab 키 포커스 트랩 핸들러
   * 첫 번째 요소에서 Shift+Tab 시 마지막 요소로 이동
   */
  const handleShiftTab = (e: KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      "[tabindex], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [href]"
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const elementsArray = Array.from(focusableElements) as HTMLElement[];
    const currentIndex = elementsArray.findIndex(
      (el) => el === document.activeElement
    );

    if (currentIndex === 0) {
      // 첫 번째 요소에서 Shift+Tab -> 마지막 요소로 (트랩 필요)
      e.preventDefault();
      elementsArray[elementsArray.length - 1].focus();
    }
    // 그 외에는 브라우저 기본 동작 허용
  };

  // 사용자의 애니메이션 감소 설정 확인
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 접근성 훅들 적용
  // 모달 열린 동안 배경 스크롤 방지
  useLockOutsideScrollEffect({ enabled: isOpen });

  // 키보드 이벤트 처리 (ESC, Tab, Shift+Tab)
  useKeyboardEffect({
    handlers: isOpen
      ? {
          onEscape: onClose,
          onTab: handleTab,
          onShiftTab: handleShiftTab,
        }
      : {},
  });

  // 모달 열릴 때 제목으로 포커스 이동
  useTriggerFocusEffect({
    enabled: isOpen,
    targetRef: titleRef as RefObject<HTMLElement>,
    delay: 50,
  });

  // 모달 닫힐 때 원래 트리거 요소로 포커스 복원
  useTriggerFocusEffect({
    enabled: !isOpen && !!modalTriggerRef.current,
    targetRef: modalTriggerRef as RefObject<HTMLElement>,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ${
        reducedMotion ? "" : "animate-in fade-in duration-200"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-auto ${
          reducedMotion
            ? ""
            : "animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2
            ref={titleRef}
            id="modal-title"
            className="text-xl font-semibold mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            tabIndex={0}
          >
            {title}
          </h2>
          {description && (
            <p id="modal-description" className="text-gray-600 mb-4">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccessibilityModal;
