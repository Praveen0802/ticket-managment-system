import React, { useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import { fetchBankAccountDetails } from "@/utils/apiHandler/request";
import { toast } from "react-toastify";

const AddEditBankDetails = ({ onClose, type, data = {}, fetchCountries }) => {
  const {
    beneficiary_name = "",
    bank_name = "",
    iban_number = "",
    beneficiary_address = "",
    bank_address = "",
    account_number = "",
    swift_code = "",
    sort_code = "",
    currency = "",
    country = "",
    country_id = "",
  } = data;

  const editType = type === "edit";
  const [loader, setLoader] = useState(false);
  const [formFieldValues, setFormFieldValues] = useState({
    beneficiary_name: beneficiary_name,
    bank_name: bank_name,
    iban_number: iban_number,
    beneficiary_address: beneficiary_address,
    bank_address: bank_address,
    account_number: account_number,
    swift_code: swift_code,
    sort_code: sort_code,
    currency: currency,
    country: country_id,
  });

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const value = selectType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const countryList = fetchCountries?.map((list) => ({
    value: list?.id,
    label: list?.name,
  }));

  const isFormValid = () => {
    const requiredFields = [
      "beneficiary_name",
      "bank_name",
      "account_number",
      "currency",
      "country",
    ];
    return requiredFields.every((field) => formFieldValues[field]);
  };

  const fieldStyle =
    "w-full rounded-md border border-gray-200 p-3 text-gray-700 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none transition-all duration-200";

  const bankFormFields = [
    {
      label: "Beneficiary Name",
      type: "text",
      id: "beneficiary_name",
      name: "beneficiary_name",
      mandatory: true,
      value: formFieldValues?.beneficiary_name,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Full name of account holder",
    },
    {
      label: "Bank Name",
      type: "text",
      id: "bank_name",
      name: "bank_name",
      mandatory: true,
      value: formFieldValues?.bank_name,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Name of the bank",
    },
    {
      label: "Account Number",
      type: "text",
      id: "account_number",
      name: "account_number",
      mandatory: true,
      value: formFieldValues?.account_number,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Bank account number",
    },
    {
      label: "IBAN Number",
      type: "text",
      id: "iban_number",
      name: "iban_number",
      value: formFieldValues?.iban_number,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "International Bank Account Number (optional)",
    },
    {
      label: "SWIFT Code",
      type: "text",
      id: "swift_code",
      name: "swift_code",
      value: formFieldValues?.swift_code,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Bank SWIFT/BIC code",
    },
    {
      label: "Sort Code",
      type: "text",
      id: "sort_code",
      name: "sort_code",
      value: formFieldValues?.sort_code,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Bank sort code/routing number",
    },
    {
      label: "Currency",
      type: "select",
      id: "currency",
      name: "currency",
      mandatory: true,
      value: formFieldValues?.currency,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      options: [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
        { value: "INR", label: "INR - Indian Rupee" },
        { value: "JPY", label: "JPY - Japanese Yen" },
        { value: "CAD", label: "CAD - Canadian Dollar" },
      ],
    },
    {
      label: "Country",
      type: "select",
      id: "country",
      name: "country",
      mandatory: true,
      searchable: true,
      value: formFieldValues?.country,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      options: countryList,
    },
    {
      label: "Beneficiary Address",
      type: "textarea",
      id: "beneficiary_address",
      name: "beneficiary_address",
      value: formFieldValues?.beneficiary_address,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Address of the account holder",
    },
    {
      label: "Bank Address",
      type: "textarea",
      id: "bank_address",
      name: "bank_address",
      value: formFieldValues?.bank_address,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1",
      placeholder: "Address of the bank branch",
    },
  ];

  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      beneficiary_name: formFieldValues.beneficiary_name,
      bank_name: formFieldValues.bank_name,
      iban_number: formFieldValues.iban_number,
      beneficiary_address: formFieldValues.beneficiary_address,
      bank_address: formFieldValues.bank_address,
      account_number: formFieldValues.account_number,
      swift_code: formFieldValues.swift_code,
      sort_code: formFieldValues.sort_code,
      currency: formFieldValues.currency,
      country: formFieldValues.country,
    };

    try {
      const response = await fetchBankAccountDetails(
        "",
        editType ? data?.id : "",
        editType ? "PUT" : "POST",
        payload
      );
      toast.success("Bank details saved successfully");
      onClose({ submit: true });
    } catch (error) {
      toast.error("Error in saving bank details");
      console.error("Error saving bank details", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg relative bg-white">
      <div className="flex p-4 border-b border-gray-200 justify-between items-center rounded-t-lg">
        <h2 className="text-lg sm:text-xl text-[#343432] font-semibold">
          {editType ? "Edit" : "Add"} Bank Details
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-4 sm:size-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <FormFields formFields={bankFormFields} />
      </div>

      <div className="fixed bottom-0 w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-2 sm:gap-3">
        <Button
          label="Cancel"
          type="secondary"
          onClick={onClose}
          classNames={{
            root: "py-1 sm:py-2 px-3 sm:px-4 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-all duration-200",
            label_: "text-xs sm:text-sm font-medium text-gray-700",
          }}
        />
        <Button
          label="Save Bank Details"
          type="primary"
          disabled={!isFormValid()}
          loading={loader}
          onClick={handleSubmit}
          classNames={{
            root: `py-1 sm:py-2 px-4 sm:px-6 rounded-md transition-all duration-200 ${
              isFormValid()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-200 cursor-not-allowed"
            }`,
            label_: `text-xs sm:text-sm font-medium ${
              isFormValid() ? "text-white" : "text-[#343432]"
            }`,
          }}
        />
      </div>
    </div>
  );
};

export default AddEditBankDetails;
