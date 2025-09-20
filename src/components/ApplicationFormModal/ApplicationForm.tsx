import type { SubmitHandler } from "react-hook-form";
import {
  useApplicationForm,
  type ApplicationFormData,
} from "./useApplicationForm";
import ErrorMessage from "./ErrorMessage";
import { useId } from "react";

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
}

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ApplicationForm = ({ onSubmit, onCancel }: ApplicationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useApplicationForm();

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const messageLength = watch("message")?.length || 0;

  const onSubmitHandler: SubmitHandler<ApplicationFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <div className="mb-5">
        <label
          htmlFor={nameId}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          id={nameId}
          type="text"
          {...register("name", {
            required: "이름을 입력해주세요.",
          })}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full px-3 py-2 text-base border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.name && <ErrorMessage message={errors.name.message || ""} />}
      </div>

      <div className="mb-5">
        <label
          htmlFor={emailId}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          id={emailId}
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: EMAIL_PATTERN,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-3 py-2 text-base border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.email && <ErrorMessage message={errors.email.message || ""} />}
      </div>

      <div className="mb-6">
        <label
          htmlFor={messageId}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          메시지
        </label>
        <textarea
          id={messageId}
          {...register("message", {
            maxLength: {
              value: 200,
              message: "메시지는 200자 이하여야 합니다.",
            },
          })}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          rows={4}
          className={`w-full px-3 py-2 text-base border rounded-md resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
        <div className="mt-1 flex justify-between">
          {errors.message ? (
            <ErrorMessage message={errors.message.message || ""} />
          ) : (
            <span className="sr-only">선택 사항, 최대 200자</span>
          )}
          <span
            className={`text-sm ${
              messageLength > 200 ? "text-red-500" : "text-gray-500"
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {messageLength}/200
          </span>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
