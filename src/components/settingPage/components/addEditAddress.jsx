import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const AddEditAddress = ({ onClose, type }) => {
  return (
    <div>
      <div className="p-4 flex border-b-[1px] border-[#F0F0F5] justify-between cursor-pointer items-center">
        <p className="text-[16px] text-[#323A70] font-semibold">
          {type == "edit" ? "Edit" : "Add"} Address
        </p>{" "}
        <IconStore.close onClick={onClose} className="size-4" />{" "}
      </div>
    </div>
  );
};

export default AddEditAddress;
