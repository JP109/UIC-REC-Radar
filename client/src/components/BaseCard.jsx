/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BaseCard = ({
  to,
  icon: Icon,
  title,
  description,
  bgColor = "bg-blue-500",
  darkBgColor = "dark:bg-blue-700",
}) => {
  return (
    <Link
      to={to}
      className="transform transition-all duration-200 hover:scale-105"
    >
      <div
        className={`${bgColor} ${darkBgColor} rounded-lg shadow-lg p-6 transition-colors duration-200`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {Icon && <Icon className="h-8 w-8 text-white dark:text-white" />}
          <h2 className="text-2xl font-bold text-white dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-white dark:text-white opacity-90">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BaseCard;
