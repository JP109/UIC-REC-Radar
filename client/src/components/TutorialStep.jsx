/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const TutorialStep = ({
  targetId,
  title,
  description,
  position = "bottom",
  onNext,
  onPrev,
  isLast,
  isFirst,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    const calculatePosition = () => {
      const element = document.getElementById(targetId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setTargetRect(rect);

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Tooltip dimensions
      const tooltipWidth = 300; // width of tooltip
      const tooltipHeight = 150; // approximate height of tooltip
      const padding = 10; // padding from target element

      let top = 0;
      let left = 0;

      // Calculate initial position based on preferred position
      switch (position) {
        case "top":
          top = rect.top - tooltipHeight - padding;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top = rect.bottom + padding;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - padding;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + padding;
          break;
      }

      // Adjust if tooltip would go outside viewport
      // Horizontal adjustments
      if (left < padding) {
        left = padding;
      } else if (left + tooltipWidth > viewportWidth - padding) {
        left = viewportWidth - tooltipWidth - padding;
      }

      // Vertical adjustments
      if (top < padding) {
        top = padding;
      } else if (top + tooltipHeight > viewportHeight - padding) {
        top = viewportHeight - tooltipHeight - padding;
      }

      setCoords({ top, left });
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [targetId, position]);

  // Add highlight effect to target element
  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.style.position = "relative";
      element.style.zIndex = "60";
      element.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5)";
      element.style.borderRadius = "0.375rem";

      return () => {
        element.style.position = "";
        element.style.zIndex = "";
        element.style.boxShadow = "";
        element.style.borderRadius = "";
      };
    }
  }, [targetId]);

  if (!targetRect) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Tooltip */}
      <div
        className="fixed z-[60] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-[300px]"
        style={{ top: coords.top, left: coords.left }}
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          {!isFirst && (
            <button
              onClick={onPrev}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Previous
            </button>
          )}
          <button
            onClick={onNext}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};
