import { ReactNode } from "react";
import "./ErrorDisplay.css";

interface ErrorProps {
  size?: number;
  children?: ReactNode;
}

const ErrorDisplay = ({ size = 80, children }: ErrorProps) => {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="error-icon"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"
        fill="rgb(244, 58, 58)"
      />
    </svg>
  );

  return (
    <div className="error-container">
      <div className="icon-container">{icon}</div>
      {!children ? (
        <div className="default-error">
          <h2 className="error-title">Something Went Wrong!</h2>
          <p className="error-message">
            We encountered an error while processing your request. Please try
            again later.
          </p>
        </div>
      ) : (
        <div className="generic-error">{children}</div>
      )}
    </div>
  );
};

export default ErrorDisplay;
