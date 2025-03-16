import React from "react";

const ComponentWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-[50%]">
      {children}
    </div>
  );
};

export default ComponentWrapper;
