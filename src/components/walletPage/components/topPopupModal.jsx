import CustomModal from "@/components/commonComponents/customModal";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const TopPopupModal = ({ show, setShow, accountDetails }) => {
  const onClose = () => {
    setShow(false);
  };

  const { fundingAccount } = accountDetails;

  const accountValues = [
    { name: "Account Name", value: accountDetails?.accountName },
    { name: "IBAN", value: accountDetails?.iban },
    { name: "Swift", value: accountDetails?.swift },
    { name: "Reference", value: accountDetails?.refernce },
  ];

  return (
    <CustomModal
      show={show}
      onClose={() => onClose()}
      outsideClickClose={false}
    >
      <div className="w-[470px] max-h-[90vh] rounded-md bg-white">
        <div className="p-4 border-b-[1px] border-[#F0F0F5] flex justify-between">
          <p className="text-[16px] text-[#323A70] font-medium">
            Top up your TX Pay account
          </p>
          <IconStore.close
            onClick={onClose}
            className="stroke-[#323A70] size-4 cursor-pointer"
          />
        </div>
        <div className="p-4 flex flex-col gap-3 border-b-[1px] border-[#F0F0F5]">
          <p className="text-[13px] text-[#323A70] text-left font-medium">
            Top up by bank transfer from your funding account.Payments can take
            up to 24 hours to appear in your TX Pay account
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-[#323A70] text-left font-medium">
              TX Pay
            </p>
            <div className="flex flex-col gap-4">
              {accountValues?.map((list, listIndex) => {
                return (
                  <div key={listIndex}>
                    <p className="text-[12px] text-gray-600">{list?.name}</p>
                    <div className="flex px-2 py-[3px] rounded-md bg-gray-200 justify-between items-center">
                      <p className="text-[12px] text-[#323A70] font-semibold">
                        {list?.value}
                      </p>
                      <IconStore.copy className="stroke-[#323A70] size-4 cursor-pointer" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 items-center bg-red-100 rounded-md px-2 py-[3px]">
              <IconStore.exclamatory className="stroke-red-500 size-7" />
              <p className="text-[12px] text-red-500">{accountDetails?.note}</p>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <p className="text-[13px] text-[#323A70] text-left font-medium">
            Funding Account
          </p>
          <div className="">
            <p className="text-[11px] text-[#323A70] font-medium">{fundingAccount?.name}</p>
            <p className="text-[11px] text-[#323A70] font-medium">{fundingAccount?.ticket}</p>
            <p className="text-[11px] text-gray-400 font-medium">{fundingAccount?.accNo}</p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default TopPopupModal;
