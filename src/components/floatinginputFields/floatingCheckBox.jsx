import React from "react";

const FloatingCheckbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  className = "",
  labelClassName = "",
  parentClassName = "",
  disabled = false,
  beforeIcon = "",
  afterIcon = "",
}) => {
  return (
    <div
      className={` flex border-[1px] w-full border-[#DADBE5] rounded-[6px] items-center ${className}`}
    >
      {beforeIcon && (
        <div className="p-[8px] border-r-[1px] border-[#DADBE5]">
          {beforeIcon}
        </div>
      )}
      <div className={"flex gap-4 justify-between w-full px-[10px] py-[6px] items-center"}>
        <div className=" flex items-center gap-2">
          <p
            title={label}
            className={`${labelClassName} text-[12px] truncate text-[#323A70] font-normal`}
          >
            {label}
          </p>
          {afterIcon && afterIcon}
        </div>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className={`border-[1px] border-[#DADBE5] w-[16px] h-[16px] cursor-pointer`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FloatingCheckbox;
