/* eslint-disable react/prop-types */
import { CheckCircle, XCircle } from "lucide-react";

const PasswordRequirements = ({ requirements }) => {
  return (
    <div className="mt-2 space-y-2 text-sm">
      {requirements.map((req, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 ${
            req.valid
              ? "text-green-600 dark:text-green-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {req.valid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{req.message}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirements;
