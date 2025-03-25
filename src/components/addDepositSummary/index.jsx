import React, { useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import { sendDepositRequest } from "@/utils/apiHandler/request";
import { toast } from "react-toastify";

const AddDepositSummary = ({ onClose }) => {
  const [loader, setLoader] = useState(false);
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
      value = e.target.value;
    } else {
      value = e.target.value;
    }

    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

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
    "w-full rounded-md border border-gray-200 p-3 text-gray-700 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none transition-all duration-200";

  const depositFormFields = [
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
      options: [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
        { value: "INR", label: "INR - Indian Rupee" },
      ],
    },
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
    <div className="w-full max-w-3xl mx-auto rounded-lg relative bg-white overflow-hidden">
      <div className="flex px-5 py-2 justify-between border-b-[1px] border-gray-200 items-center rounded-t-lg">
        <h2 className="text-xl text-[#323A70] font-semibold">Add Deposit</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-5 " />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6 ">
        <FormFields formFields={depositFormFields} />
      </div>

      {/* Enhanced footer with better separation */}
      <div className="fixed bottom-0 w-full px-6 py-4 bg-gray-50 border-t-2 border-indigo-100 rounded-b-lg flex justify-end gap-3 shadow-inner">
        <Button
          label="Cancel"
          type="secondary"
          onClick={onClose}
          classNames={{
            root: "py-2 px-4 border-2 border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-all duration-200 shadow-sm",
            label_: "text-sm font-medium text-gray-700",
          }}
        />
        <Button
          label="Submit"
          type="primary"
          disabled={!isFormValid()}
          loading={loader}
          onClick={handleSubmit}
          classNames={{
            root: `py-2 px-6 rounded-md transition-all duration-200 shadow-sm ${
              isFormValid()
                ? "bg-[#130061] hover:bg-[#1a0080] border-2 border-[#130061]"
                : "bg-[#130061]/70 cursor-not-allowed border-2 border-[#130061]/70"
            }`,
            label_: `text-sm font-medium ${
              isFormValid() ? "text-white" : "text-white/90"
            }`,
          }}
        />
      </div>
    </div>
  );
};

export default AddDepositSummary;
