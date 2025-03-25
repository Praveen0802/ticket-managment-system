import React, { useState } from "react";
import Button from "../commonComponents/button";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import RightViewModal from "../commonComponents/rightViewModal";
import { fetchBankAccountDetails } from "@/utils/apiHandler/request";
import AddEditBankDetails from "./components/addEditBankDetails";

const BankAccounts = (props) => {
  const { bankDetails } = props;

  const [bankAccountDetails, setBankAccountDetails] = useState(bankDetails);

  const hasAccountDetails = bankAccountDetails && bankAccountDetails.length > 0;
  const [bankDetailsView, setBankDetailsView] = useState({
    show: false,
    data: "",
    type: "",
  });

  const handleEditClick = async (item) => {
    const response = await fetchBankAccountDetails("", item?.bank_id);
    setBankDetailsView({
      show: true,
      data: { id: item?.bank_id, ...response },
      type: "edit",
    });
  };

  const handleClosePopUP = async (submit) => {
    if (submit?.submit) {
      const response = await fetchBankAccountDetails();
      setBankAccountDetails(response);
    }
    setBankDetailsView({ show: false, data: "", type: "" });
  };

  const renderBankAccountCard = (account, index) => {
    if (
      !account.beneficiary_name &&
      !account.bank_name &&
      !account.account_number
    ) {
      return null;
    }

    return (
      <div
        key={`bank-${index}`}
        className="border-[1px] border-[#eaeaf1] rounded-lg"
      >
        <div className="flex p-3  justify-between border-b-[1px] border-[#eaeaf1] items-center mb-2">
          <div className="capitalize font-medium text-gray-700">
            {account?.bank_name || "Bank Account"}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleEditClick(account);
            }}
          >
            <IconStore.pencilEdit className="size-4 stroke-2 cursor-pointer stroke-[#130061]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3 ">
          {account?.beneficiary_name && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Beneficiary Name</span>
              <span className="text-sm">{account?.beneficiary_name}</span>
            </div>
          )}

          {account?.account_number && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Account Number</span>
              <span className="text-sm">{account?.account_number}</span>
            </div>
          )}

          {account?.beneficiary_address && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Beneficiary Address</span>
              <span className="text-sm">{account?.beneficiary_address}</span>
            </div>
          )}

          {account?.bank_address && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Bank Address</span>
              <span className="text-sm">{account?.bank_address}</span>
            </div>
          )}

          {account?.swift_code && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Swift Code</span>
              <span className="text-sm">{account?.swift_code}</span>
            </div>
          )}

          {account?.currency && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Currency</span>
              <span className="text-sm">{account?.currency}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[90%] flex flex-col">
      <p className="text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        Bank Accounts
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] h-full">
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hasAccountDetails ? (
              bankAccountDetails.map((account, index) =>
                renderBankAccountCard(account, index)
              )
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No bank accounts found. Add your first bank account.
              </div>
            )}
          </div>
          <Button
            label="+ Add New Bank"
            onClick={() => {
              setBankDetailsView({ show: true, type: "add" });
            }}
            classNames={{
              root: "bg-[#130061] py-1 px-3 w-fit md:px-[14px]",
              label_: "text-xs md:text-sm text-white font-normal",
            }}
          />
        </div>
      </div>
      <RightViewModal
        show={bankDetailsView?.show}
        onClose={handleClosePopUP}
        className={"w-[600px]"}
        outSideClickClose={true}
      >
        <AddEditBankDetails
          data={bankDetailsView?.data}
          onClose={handleClosePopUP}
          type={bankDetailsView?.type}
        />
      </RightViewModal>
    </div>
  );
};

export default BankAccounts;
