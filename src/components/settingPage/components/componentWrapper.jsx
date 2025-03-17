import React from "react";

const ComponentWrapper = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-3 md:p-4 ${className}`}>
      {children}
    </div>
  );
};

export default ComponentWrapper;
