/**
 * 에러 메시지 컴포넌트의 props 인터페이스
 */
interface ErrorMessageProps {
  /** 표시할 에러 메시지 */
  message: string;
}

/**
 * 접근성을 고려한 에러 메시지 컴포넌트
 * 스크린 리더가 에러를 즉시 읽을 수 있도록 role="alert"와 aria-live를 사용합니다.
 *
 * @param message - 표시할 에러 메시지
 */
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p role="alert" aria-live="polite" className="mt-1 text-sm text-red-500">
      {message}
    </p>
  );
};

export default ErrorMessage;
