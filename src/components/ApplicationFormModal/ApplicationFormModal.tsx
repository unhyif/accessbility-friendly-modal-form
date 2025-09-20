import AccessibilityModal from "../AccessibilityModal";
import ApplicationForm from "./ApplicationForm";
import type { ApplicationFormData } from "./useApplicationForm";
import { overlay } from "overlay-kit";

/**
 * 지원서 폼 모달을 관리하는 객체
 * overlay-kit을 사용하여 선언적으로 모달을 열고 폼 데이터를 반환받습니다.
 */
const ApplicationFormModal = {
  /**
   * 지원서 폼 모달을 열고 사용자 입력을 기다립니다.
   *
   * @returns Promise<ApplicationFormData | null> - 폼 제출 시 데이터, 취소 시 null
   */
  async open(): Promise<ApplicationFormData | null> {
    return overlay.openAsync<ApplicationFormData | null>(
      ({ isOpen, close }) => (
        <AccessibilityModal
          isOpen={isOpen}
          onClose={() => close(null)}
          title="신청 폼"
          description="정보를 입력해주세요."
        >
          <ApplicationForm
            onSubmit={(data) => close(data)}
            onCancel={() => {
              close(null);
            }}
          />
        </AccessibilityModal>
      )
    );
  },
};

export default ApplicationFormModal;
