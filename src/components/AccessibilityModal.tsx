import type { ReactNode, RefObject } from "react";

import { useKeyboardEffect } from "./ApplicationFormModal/hooks/useKeyboardEffect";
import { useLockOutsideScrollEffect } from "./ApplicationFormModal/hooks/useLockOutsideScrollEffect";
import { useRef } from "react";
import { useTriggerFocusEffect } from "./ApplicationFormModal/hooks/useTriggerFocusEffect";

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description?: string;
}

const AccessibilityModal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}: AccessibilityModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  // 모달이 열릴 때 트리거 요소 저장
  if (isOpen && !modalTriggerRef.current) {
    modalTriggerRef.current = document.activeElement as HTMLElement;
  }

  // 포커스 트랩 핸들러들
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

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Effects
  useLockOutsideScrollEffect({ enabled: isOpen });

  useKeyboardEffect({
    handlers: isOpen
      ? {
          onEscape: onClose,
          onTab: handleTab,
          onShiftTab: handleShiftTab,
        }
      : {},
  });

  useTriggerFocusEffect({
    enabled: isOpen,
    targetRef: titleRef as RefObject<HTMLElement>,
    delay: 50,
  });

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
