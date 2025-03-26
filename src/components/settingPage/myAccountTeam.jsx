import { fetchProfileDetails } from "@/utils/apiHandler/request";
import { useState } from "react";
import Button from "../commonComponents/button";
import AccounInfoForm from "./components/accounInfoForm";
import { toast } from "react-toastify";

const MyAccountTeam = (props) => {
  const { profileDetails } = props;

  const initialValues = {
    firstName: profileDetails?.first_name,
    lastName: profileDetails?.last_name,
    email: profileDetails?.email,
    phoneNumber: profileDetails?.mobile_number,
  };

  const [formData, setFormData] = useState(initialValues);
  const [submitLoader, setSubmitLoader] = useState(false);

  const handleChange = (e, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [countryCode, setCountryCode] = useState(
    `+${profileDetails?.phone_code}`
  );

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const updateProfileDetails = async () => {
    setSubmitLoader(true);
    const payload = {
      first_name: formData?.firstName,
      last_name: formData?.lastName,
      email: formData?.email,
      mobile_number: formData?.phoneNumber,
      phone_code: countryCode?.replace("+", ""),
    };
    try {
      const response = await fetchProfileDetails(null, "PUT", payload);
      toast.success("Profile Details Updated Successfully");
    } catch (error) {
      toast.error("Failed to update profile details");
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <div className="h-[90%] max-w-full">
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        My Account
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] h-full">
        <div className="p-3 md:p-6 border-b-[1px] border-[#eaeaf1]">
          <h3 className="text-base md:text-lg font-medium mb-3 md:mb-5">
            Account information
          </h3>
          <div className="flex flex-col gap-4 md:gap-6">
            <AccounInfoForm
              formData={formData}
              handleChange={handleChange}
              countryCode={countryCode}
              handleCountryCodeChange={handleCountryCodeChange}
            />
            <div className="flex max-md:w-[50%] gap-3 items-center">
              <Button
                type="secondary"
                label="Cancel"
                onClick={() => {
                  setFormData(initialValues);
                }}
                classNames={{
                  root: "w-full sm:w-auto border-[1px] justify-center border-[#022B50] py-1 px-3 md:px-[14px]",
                  label_: "text-xs md:text-sm text-center font-medium",
                }}
              />
              <Button
                label="Submit"
                onClick={updateProfileDetails}
                loading={submitLoader}
                classNames={{
                  root: "w-full sm:w-auto bg-[#130061] justify-center py-1 px-3 md:px-[14px] sm:mt-0",
                  label_: "text-xs md:text-sm text-center text-white font-normal",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountTeam;