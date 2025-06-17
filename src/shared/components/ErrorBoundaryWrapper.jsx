import { useNavigate } from "react-router-dom";

import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import ErrorFallback from "@/shared/components/ErrorFallback";

const ErrorBoundaryWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={ErrorFallback} onReset={() => navigate("/")}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
