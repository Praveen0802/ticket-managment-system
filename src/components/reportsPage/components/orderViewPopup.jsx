import RightViewModal from "@/components/commonComponents/rightViewModal";
import { formatDateTime } from "@/utils/helperFunctions";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";
import TransactionPopup from "./transactionPopup";
import DepositPopup from "./depositPopup";

const OrderViewPopup = ({ show, onClose, outSideClickClose, data }) => {
  if (!data) return null;

  return (
    <RightViewModal
      show={show}
      onClose={onClose}
      outSideClickClose={outSideClickClose}
      className={"w-[500px]"}
    >
      {data?.transactionType == "wallet" ? (
        <DepositPopup data={data} onClose={onClose} />
      ) : (
        <TransactionPopup data={data} onClose={onClose} />
      )}
    </RightViewModal>
  );
};

export default OrderViewPopup;
