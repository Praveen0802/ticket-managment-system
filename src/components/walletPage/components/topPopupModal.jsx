import CustomModal from "@/components/commonComponents/customModal";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const TopPopupModal = ({ show, setShow, accountDetails }) => {
  const onClose = () => {
    setShow(false);
  };
  return (
    <CustomModal
      show={show}
      onClose={() => onClose()}
      outsideClickClose={false}
    >
      <div className="w-[676px] max-h-[90vh] rounded-md bg-white">
        <div className="p-4 border-b-[1px] border-[#F0F0F5] flex justify-between">
          <p className="text-[18px] text-[#323A70] font-medium">
            Top up your TX Pay account
          </p>
          <IconStore.close
            onClick={onClose}
            className="stroke-[#323A70] size-4 cursor-pointer"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default TopPopupModal;
