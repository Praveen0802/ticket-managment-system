import React, { useState } from "react";
import Button from "../commonComponents/button";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import RightViewModal from "../commonComponents/rightViewModal";
import { fetchBankAccountDetails } from "@/utils/apiHandler/request";
import AddEditBankDetails from "./components/addEditBankDetails";

const BankAccounts = (props) => {
  const { bankDetails, fetchCountries } = props;

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
        className="border border-[#eaeaf1] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex p-3 justify-between border-b border-[#eaeaf1] items-center">
          <div className="capitalize font-medium text-gray-700 truncate">
            {account?.bank_name || "Bank Account"}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleEditClick(account);
            }}
          >
            <IconStore.pencilEdit className="size-4 stroke-2 cursor-pointer stroke-[#130061] hover:stroke-[#323A70] transition-colors" />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3">
          {renderAccountDetail("Beneficiary Name", account?.beneficiary_name)}
          {renderAccountDetail("Account Number", account?.account_number)}
          {renderAccountDetail(
            "Beneficiary Address",
            account?.beneficiary_address
          )}
          {renderAccountDetail("Bank Address", account?.bank_address)}
          {renderAccountDetail("Swift Code", account?.swift_code)}
          {renderAccountDetail("Currency", account?.currency)}
        </div>
      </div>
    );
  };

  const renderAccountDetail = (label, value) => {
    if (!value) return null;
    return (
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm truncate">{value}</span>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <p className="text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        Bank Accounts
      </p>
      <div className="bg-white border border-[#eaeaf1] h-full rounded-lg">
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hasAccountDetails ? (
              bankAccountDetails.map((account, index) =>
                renderBankAccountCard(account, index)
              )
            ) : (
              <div className="col-span-full flex items-center justify-center h-full text-gray-500 text-center p-4">
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
              root: "bg-[#130061] py-1 px-3 w-fit md:px-[14px] hover:bg-[#1e0096] transition-colors duration-300",
              label_: "text-xs md:text-sm text-white font-normal",
            }}
          />
        </div>
      </div>
      <RightViewModal
        show={bankDetailsView?.show}
        onClose={handleClosePopUP}
        className={"w-full sm:w-[600px] max-w-full"}
        outSideClickClose={true}
      >
        <AddEditBankDetails
          data={bankDetailsView?.data}
          onClose={handleClosePopUP}
          type={bankDetailsView?.type}
          fetchCountries={fetchCountries}
        />
      </RightViewModal>
    </div>
  );
};

export default BankAccounts;
