import React from "react";

const ListView = ({ title, desc, icon, sideLabel = "", className = {} }) => {
  const { label = "", root = "", rightLabel = "", descClass = "" } = className;

  return (
    <div
      className={`border-[1px] flex flex-col rounded-md ${root} gap-1 p-2 border-[#eaeaf1]`}
    >
      <div
        className={`${label} text-[16px] font-semibold flex items-center w-full justify-between`}
      >
        {title}
        {sideLabel && <span className={rightLabel}>{sideLabel}</span>}
        {icon && icon}
      </div>
      <div className={`text-gray-500 text-[12px] ${descClass}`}>{desc}</div>
    </div>
  );
};

export default ListView;
