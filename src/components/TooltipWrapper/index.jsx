import { useState } from "react";

export default function TooltipWrapper({ children, text, position = "top" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Map of position configurations
  const positionConfigs = {
    top: {
      tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-1",
      pointerClass: "absolute top-full left-1/2 -translate-x-1/2",
      borderClass: "border-l-4 border-r-4 border-t-4 border-t-gray-800",
    },
    bottom: {
      tooltipClass: "top-full left-1/2 -translate-x-1/2 mt-1",
      pointerClass: "absolute bottom-full left-1/2 -translate-x-1/2",
      borderClass: "border-l-4 border-r-4 border-b-4 border-b-gray-800",
    },
    left: {
      tooltipClass: "right-full top-1/2 -translate-y-1/2 mr-1",
      pointerClass: "absolute top-1/2 left-full -translate-y-1/2",
      borderClass: "border-t-4 border-b-4 border-l-4 border-l-gray-800",
    },
    right: {
      tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-1",
      pointerClass: "absolute top-1/2 right-full -translate-y-1/2",
      borderClass: "border-t-4 border-b-4 border-r-4 border-r-gray-800",
    },
  };

  // Get configuration for current position
  const config = positionConfigs[position] || positionConfigs.top;

  // Event handlers
  const showTooltipHandlers = {
    onMouseEnter: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false),
    onFocus: () => setShowTooltip(true),
    onBlur: () => setShowTooltip(false),
  };

  return (
    <div className="relative inline-block" {...showTooltipHandlers}>
      {children}

      {showTooltip && (
        <div
          className={`absolute z-10 ${config.tooltipClass} bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap`}
        >
          {text}
          <div
            className={`${config.pointerClass} w-0 h-0 border-solid border-transparent ${config.borderClass}`}
          ></div>
        </div>
      )}
    </div>
  );
}
