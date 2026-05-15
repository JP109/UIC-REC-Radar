/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BaseCard = ({ to, icon: Icon, title, description }) => {
  return (
    <Link
      to={to}
      className="block transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 sm:p-6 border-t-4 border-uic-red transition-colors duration-200 h-full min-h-[130px] sm:min-h-[160px]">
        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
          <div className="p-2.5 sm:p-3 bg-uic-navy/10 dark:bg-uic-navy/30 rounded-full">
            {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-uic-navy dark:text-white" />}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-uic-navy dark:text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BaseCard;
