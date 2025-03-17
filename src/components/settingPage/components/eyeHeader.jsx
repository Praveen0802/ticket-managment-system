import React from "react";
import { FiEye } from "react-icons/fi";

const EyeHeader = ({ title, onChange, hideEye }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-medium">{title}</h2>
      {!hideEye && <FiEye onChange={onChange} className="text-[#130061]" />}
    </div>
  );
};

export default EyeHeader;
