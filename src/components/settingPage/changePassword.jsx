import React, { useState } from "react";
import Button from "../commonComponents/button";
import { changePasswordRequest } from "@/utils/apiHandler/request";
import FormFields from "../formFieldsComponent";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
  const { profileDetails } = props;
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, key) => {
    const value = e.target.value;
    setPasswordData({ ...passwordData, [key]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      user_name: profileDetails?.email,
      password: passwordData?.newPassword,
      confirm_password: passwordData?.confirmPassword,
    };
    await changePasswordRequest("", payload);
    toast.success("Password Changed Successfully");
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  const formFields = [
    {
      className: "!py-[10px] !px-[12px] rounded-md w-full", // Added w-full for mobile
      autoComplete: "new-password",
      id: "newPassword",
      name: "newPassword",
      type: "password",
      label: "New Password",
      value: passwordData?.newPassword,
      onChange: handleChange,
      placeholder: "Enter new password",
    },
    {
      className: "!py-[10px] !px-[12px] rounded-md w-full", // Added w-full for mobile
      autoComplete: "new-password",
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      value: passwordData?.confirmPassword,
      onChange: handleChange,
      placeholder: "Confirm your new password",
    },
  ];

  const enabled =
    passwordData?.newPassword &&
    passwordData?.confirmPassword &&
    !isSubmitting &&
    passwordData?.newPassword === passwordData?.confirmPassword;

  return (
    <div className="h-[90%] max-w-full">
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        Change Password
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] h-full">
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6 border-[1px] border-[#eaeaf1]">
          <h3 className="text-base md:text-lg font-medium">Account password</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Change your account password
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-[60%]">
            <FormFields formFields={formFields} className="w-full" />
          </div>
          <Button
            label="Submit"
            type="primary"
            disabled={!enabled}
            onClick={handleSubmit}
            classNames={{
              root: `py-1 px-3 md:px-[14px] w-fit transition-all duration-200 ${
                enabled
                  ? "bg-[#130061] hover:bg-[#0f0053]"
                  : "bg-gray-300 opacity-50 cursor-not-allowed"
              }`,
              label_: `text-xs md:text-sm font-normal ${
                enabled ? "text-white" : "text-gray-400"
              }`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
