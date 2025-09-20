import AccessibilityModal from "../AccessibilityModal";
import ApplicationForm from "./ApplicationForm";
import type { ApplicationFormData } from "./useApplicationForm";
import { overlay } from "overlay-kit";

const ApplicationFormModal = {
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
