import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import FloatingLabelInput from "../floatinginputFields";
import PhoneInputComponent from "../commonComponents/phoneInputComponent";
import AccounInfoForm from "./components/accounInfoForm";
import Button from "../commonComponents/button";

const MyAccountTeam = () => {
  const [formData, setFormData] = useState({
    firstName: "Amir",
    lastName: "Khan",
    email: "pk@yopmail.com",
    phoneNumber: "",
  });
  const handleChange = (e) => {
    console.log(e.target?.name, e?.target?.value, "e.targete.target");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [countryCode, setCountryCode] = useState("+41");

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const addressValues = [
    {
      title: "DownTown Dubai - 12345",
      address: "DownTown Dubai Dubai United Arab Emirates 12345",
      phoneNumber: "+971 123 456 7890",
    },
  ];
  return (
    <div>
      <p className="pb-4 text-[20px] p-4 font-semibold">My Account</p>
      <div className="bg-white  border-[1px] border-[#eaeaf1]">
        {/* Account information section */}
        <div className="p-6 border-b-[1px] border-[#eaeaf1]">
          <h3 className="text-lg font-medium mb-5">Account information</h3>
          <div className="flex flex-col gap-6">
            <AccounInfoForm
              formData={formData}
              handleChange={handleChange}
              countryCode={countryCode}
              handleCountryCodeChange={handleCountryCodeChange}
            />
            <div className="flex gap-3 items-center">
              <Button
                type="secondary"
                label="Cancel"
                classNames={{
                  root: "border-[1px] border-[#022B50] py-1 px-[14px]",
                  label_: "text-[14px] font-medium",
                }}
              />
              <Button
                label="Submit"
                classNames={{
                  root: " bg-[#130061] py-1 px-[14px]",
                  label_: "text-[14px] text-white font-normal",
                }}
              />
            </div>
          </div>
        </div>

        {/* Account password section */}
        <div className="p-6 flex flex-col gap-6 border-[1px] border-[#eaeaf1]">
          <h3 className=" text-lg font-medium ">Account password</h3>
          <p className="text-gray-600 ">Change your account password</p>
          <Button
            label="Change Password"
            classNames={{
              root: " bg-[#130061] py-1 px-[14px] w-fit",
              label_: "text-[14px] text-white font-normal",
            }}
          />
        </div>

        {/* Address book section */}
        <div className="p-6 flex flex-col gap-6">
          <h3 className="text-lg font-medium ">Address book</h3>
          <p className="">Default address</p>
          <div className="grid grid-cols-3 gap-4">
            {addressValues?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-[1px] border-[#eaeaf1] rounded-lg"
                >
                  <div className="flex justify-between items-center p-4 border-b-[1px] border-[#eaeaf1]">
                    <p className="text-[16px] text-[#323A70] font-medium">{item?.title}</p>
                    <IconStore.pencilEdit className="size-4 stroke-2 cursor-pointer stroke-purple-500" />
                  </div>
                  <p className="p-4 text-[14px] max-w-[200px]">{item?.address}</p>
                  <p className="p-4 border-t-[1px] text-[14px] border-[#eaeaf1]">{item?.phoneNumber}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountTeam;
