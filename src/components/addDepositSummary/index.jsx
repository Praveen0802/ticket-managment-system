import React, { useEffect, useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import {
  getCurrencyDetails,
  sendDepositRequest,
} from "@/utils/apiHandler/request";
import { toast } from "react-toastify";
import TopPopupModal from "../walletPage/components/topPopupModal";
import FooterButton from "../footerButton";

const AddDepositSummary = ({ onClose }) => {
  const [loader, setLoader] = useState(false);
  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [formFieldValues, setFormFieldValues] = useState({
    deposit_amount: "",
    currency: "",
    payment_transfer_by: "",
    proof: "",
    notes: "",
  });

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const fileType = type === "file";
    let value;
    if (selectType) {
      value = e;
    } else if (fileType) {
      value = e.target.value; // Change this to get the file object
    } else {
      value = e.target.value;
    }

    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const fetchCurrencies = async () => {
    const response = await getCurrencyDetails();
    const options = response?.data?.map((item) => ({
      label: item?.currency,
      value: item?.currency,
    }));
    setCurrencyDetails(options);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const isFormValid = () => {
    const requiredFields = [
      "deposit_amount",
      "currency",
      "payment_transfer_by",
      "proof",
      "notes",
    ];
    return requiredFields.every((field) => formFieldValues[field]);
  };

  const fieldStyle =
    "w-full rounded-md border border-gray-200 p-3 text-gray-700 transition-all duration-200";

  const depositFormFields = [
    [
      {
        label: "Deposit Amount",
        type: "text",
        id: "deposit_amount",
        name: "deposit_amount",
        mandatory: true,
        value: formFieldValues?.deposit_amount,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Enter Your Deposit Amount",
      },
      {
        label: "Deposit Currency",
        type: "select",
        id: "currency",
        name: "currency",
        mandatory: true,
        value: formFieldValues?.currency,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        options: currencyDetails,
      },
    ],
    [
      {
        label: "Transfer By",
        type: "select",
        id: "payment_transfer_by",
        name: "payment_transfer_by",
        mandatory: true,
        value: formFieldValues?.payment_transfer_by,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        options: [
          { value: "ONLINE", label: "ONLINE" },
          { value: "CASH", label: "CASH" },
          { value: "CHEQUE", label: "CHEQUE" },
        ],
      },
      {
        label: "Proof",
        type: "file",
        id: "proof",
        name: "proof",
        mandatory: true,
        value: formFieldValues?.proof,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        buttonText: "Upload Proof File",
        accept: ".pdf,.jpg,.jpeg,.png",
        allowedFileTypes: ["pdf", "jpg", "jpeg", "png"],
        maxFileSize: 10, // 10MB
      },
      {
        label: "Deposit Notes",
        type: "text",
        id: "notes",
        name: "notes",
        value: formFieldValues?.notes,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Notes",
      },
    ],
  ];

  const handleSubmit = async () => {
    setLoader(true);
    const payload = new FormData();
    Object.entries(formFieldValues).forEach(([key, value]) => {
      if (key === "proof" && value instanceof File) {
        payload.append(key, value);
      } else if (key !== "proof") {
        payload.append(key, value);
      }
    });

    try {
      await sendDepositRequest(payload);
      toast.success("Deposit details saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving deposit details", error);
      toast.error("Error saving deposit details");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg relative bg-white flex flex-col h-[100vh]">
      {/* Header */}
      <div className="flex px-4 sm:px-5 py-2 justify-between border-b-[1px] border-gray-200 items-center rounded-t-lg">
        <h2 className="text-lg sm:text-[20px] text-[#323A70] font-semibold">
          Top up your TX pay Account
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-4 sm:size-5" />
        </button>
      </div>

      {/* Scrollable content area - added flex-grow to ensure it takes available space */}
      <div className=" flex flex-col gap-1 overflow-y-auto">
        <TopPopupModal />

        {/* Form Content */}
        <div className="flex flex-col gap-4 p-4 sm:px-6 pb-6">
          <p>Add Deposit</p>
          <div className=" flex flex-col gap-4 sm:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFields formFields={depositFormFields[0]} />
            </div>
            <FormFields formFields={depositFormFields[1]} />
          </div>
        </div>
        {/* Added spacer div to push footer down when content is short */}
        <div className="flex-grow"></div>
      </div>

      {/* Footer - removed sticky positioning since we're using flex layout */}
      <FooterButton
        isFormValid={isFormValid}
        onClose={onClose}
        handleSubmit={handleSubmit}
        loader={loader}
      />
    </div>
  );
};

export default AddDepositSummary;
