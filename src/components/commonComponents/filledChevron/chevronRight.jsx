import React from "react";

const ChevronRight = ({ color = "", className = "" }) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.5 10.5L6 6L1.5 1.5" fill={color || "#130061"} />
      <path
        d="M1.5 10.5L6 6L1.5 1.5L1.5 10.5Z"
        stroke={color || "#130061"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChevronRight;
