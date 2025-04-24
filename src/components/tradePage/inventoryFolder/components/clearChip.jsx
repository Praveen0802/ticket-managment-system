import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const ClearChip = ({ text, value, onClick }) => {
  function formatFieldName(fieldName) {
    // Remove '_id' suffix if present
    const withoutId = fieldName.replace(/_id$/, "");

    // Split by underscores and capitalize each word
    return withoutId
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="text-[12px] gap-1 font-normal flex items-center border-[1px] border-[#DADBE5] rounded-xl px-2 py-1">
      <p>
        {formatFieldName(text)}:{value}
      </p>
      <button
        onClick={() => {
          onClick(text, value);
        }}
        className="cursor-pointer"
      >
        <IconStore.close className="size-3" />
      </button>
    </div>
  );
};

export default ClearChip;
