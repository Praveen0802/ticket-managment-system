import Button from "@/components/commonComponents/button";
import CustomModal from "@/components/commonComponents/customModal";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";

const AddPayOutPopup = ({ show, onClose, item }) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    country: "us",
    currency: "aed",
    bankName: "",
    branchName: "",
    iban: "",
    sort: "",
  });

  const handleChange = (e) => {};

  const formFields = [
    {
      label: "Country",
      type: "select",
      options: [
        { value: "us", label: "United Arab Emirates" },
        { value: "ca", label: "Canada" },
        { value: "mx", label: "Mexico" },
      ],
      value: formData?.country,
      onChange: handleChange,
      className: "!py-[6px] !px-[12px]",
    },
    {
      label: "Currency",
      type: "select",
      options: [
        { value: "aed", label: "AED" },
        { value: "ed", label: "Canada" },
        { value: "cd", label: "Mexico" },
      ],
      selectedValue: formData?.currency,
      onSelect: handleChange,
      className: "!py-[6px] !px-[12px]",
    },
    {
      id: "accountHolderName",
      name: "accountHolderName",
      label: "Account Holder Name",
      value: formData?.accountHolderName,
      onChange: handleChange,
      type: "text",
      className: "!py-[6px] !px-[12px]",
      autoComplete: "off",
    },
    {
      id: "bankName",
      name: "bankName",
      label: "Bank Name",
      value: formData?.bankName,
      onChange: handleChange,
      type: "text",
      className: "!py-[6px] !px-[12px]",
      autoComplete: "off",
    },
    {
      id: "branchName",
      name: "branchName",
      label: "Branch Name",
      value: formData?.branchName,
      onChange: handleChange,
      type: "text",
      className: "!py-[6px] !px-[12px]",
      autoComplete: "off",
    },
    {
      id: "iban",
      name: "iban",
      label: "IBAN/Account Number",
      value: formData?.iban,
      onChange: handleChange,
      type: "text",
      className: "!py-[6px] !px-[12px]",
      autoComplete: "off",
    },
    {
      id: "sort",
      name: "sort",
      label: "Sort Code/SWlFT/BlC/Routing Number",
      value: formData?.sort,
      onChange: handleChange,
      className: "!py-[6px] !px-[12px]",
      type: "text",
      autoComplete: "off",
    },
  ];

  return (
    <CustomModal show={show} onClose={onClose} outSideClickClose={false}>
      <div className="bg-white rounded-lg w-full md:w-[600px] max-w-full">
        <div className="flex px-4 md:px-[24px] py-3 md:py-[16px] border-b-[1px] border-[#E0E1EA] justify-between items-center">
          <p className="text-[16px] md:text-[18px] text-[#323A70] font-semibold">
            Add Payout Accounts
          </p>
          <div onClick={onClose} className="cursor-pointer">
            <IconStore.close className="size-5 stroke-[#323A70]" />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFields formFields={formFields} />
          </div>
          <div className="flex gap-3 md:gap-4 items-center justify-end">
            <Button
              type="secondary"
              label="Cancel"
              classNames={{ root: "px-[10px] py-[8px]" }}
            />
            <Button
              type="primary"
              label="Add"
              classNames={{ root: "px-[14px] py-[8px] bg-[#0137D5]" }}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddPayOutPopup;
