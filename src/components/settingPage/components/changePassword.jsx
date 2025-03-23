import Button from "@/components/commonComponents/button";
import CustomModal from "@/components/commonComponents/customModal";
import FormFields from "@/components/formFieldsComponent";
import { changePasswordRequest } from "@/utils/apiHandler/request";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";

const ChangePassword = ({ show, onClose, outSideClickClose, email }) => {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
      newPassword: "",
      confirmPassword: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e, key) => {
    const value = e.target.value;
    setPasswordData({ ...passwordData, [key]: value });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      user_name: email,
      password: passwordData?.newPassword,
      confirm_password: passwordData?.confirmPassword,
    };
    const passWordChange = await changePasswordRequest("", payload);
    // toast message
    setTimeout(() => {
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const formFields = [
    {
      className: "!py-[10px] !px-[12px] rounded-md",
      autoComplete: "new-password",
      id: "newPassword",
      name: "newPassword",
      type: "password",
      label: "New Password",
      value: passwordData?.newPassword,
      onChange: handleChange,
      error: errors.newPassword,
      placeholder: "Enter new password",
      helperText:
        "Must contain 8+ characters with upper, lower, number, and special character",
    },
    {
      className: "!py-[10px] !px-[12px] rounded-md",
      autoComplete: "new-password",
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      value: passwordData?.confirmPassword,
      onChange: handleChange,
      error: errors.confirmPassword,
      placeholder: "Confirm your new password",
    },
  ];

  const isFormValid =
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword === passwordData.confirmPassword;

  return (
    <CustomModal
      show={show}
      onClose={handleClose}
      outsideClickClose={outSideClickClose}
    >
      <div className="bg-white w-[400px] rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b-[1px] border-[#F0F0F5] p-5">
          <h2 className="text-[18px] text-[#323A70] font-semibold">
            Change Password
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IconStore.close className="size-5" />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <p className="text-sm text-gray-600">
            Create a strong password that you don't use for other accounts
          </p>
          <div className="flex flex-col gap-4">
            <FormFields formFields={formFields} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="secondary"
              label="Cancel"
              onClick={handleClose}
              classNames={{
                root: "px-[16px] w-fit py-[10px] border-[#E5E7EB] text-gray-700",
              }}
            />
            <Button
              type="primary"
              label={isSubmitting ? "Updating..." : "Update Password"}
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
              classNames={{
                root: `px-[16px] w-fit py-[10px] bg-[#0137D5] hover:bg-[#0025A0] transition-colors ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`,
              }}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ChangePassword;
