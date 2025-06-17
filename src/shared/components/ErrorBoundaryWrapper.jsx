import { useNavigate } from "react-router-dom";

import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import ErrorFallback from "@/shared/components/ErrorFallback";
import { ROUTES } from "@/shared/constants/routePaths";

const ErrorBoundaryWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      fallback={ErrorFallback}
      onReset={() => navigate(ROUTES.ROOT)}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
