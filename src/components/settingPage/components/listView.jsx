import React from "react";

const ListView = ({ title, desc, icon, className = {} }) => {
  const { label = "", root = "", descClass = "" } = className;

  return (
    <div
      className={`border-[1px] flex flex-col rounded-md ${root} gap-1 p-2 border-[#eaeaf1]`}
    >
      <div
        className={`${label} text-[16px] font-semibold flex w-full justify-between`}
      >
        {title}
        {icon && icon}
      </div>
      <div className={`text-gray-500 text-[12px] ${descClass}`}>{desc}</div>
    </div>
  );
};

export default ListView;
