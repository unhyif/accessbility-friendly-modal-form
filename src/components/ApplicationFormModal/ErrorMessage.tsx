interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p role="alert" aria-live="polite" className="mt-1 text-sm text-red-500">
      {message}
    </p>
  );
};

export default ErrorMessage;
