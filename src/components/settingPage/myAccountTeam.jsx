import { IconStore } from "@/utils/helperFunctions/iconStore";
import { useState } from "react";
import Button from "../commonComponents/button";
import AccounInfoForm from "./components/accounInfoForm";

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
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        My Account
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1]">
        {/* Account information section */}
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
            <div className="flex gap-3 items-center">
              <Button
                type="secondary"
                label="Cancel"
                classNames={{
                  root: "border-[1px] border-[#022B50] py-1 px-3 md:px-[14px]",
                  label_: "text-xs md:text-sm font-medium",
                }}
              />
              <Button
                label="Submit"
                classNames={{
                  root: "bg-[#130061] py-1 px-3 md:px-[14px]",
                  label_: "text-xs md:text-sm text-white font-normal",
                }}
              />
            </div>
          </div>
        </div>

        {/* Account password section */}
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6 border-[1px] border-[#eaeaf1]">
          <h3 className="text-base md:text-lg font-medium">Account password</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Change your account password
          </p>
          <Button
            label="Change Password"
            classNames={{
              root: "bg-[#130061] py-1 px-3 md:px-[14px] w-fit",
              label_: "text-xs md:text-sm text-white font-normal",
            }}
          />
        </div>

        {/* Address book section */}
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6">
          <h3 className="text-base md:text-lg font-medium">Address book</h3>
          <p className="text-sm md:text-base">Default address</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addressValues?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-[1px] border-[#eaeaf1] rounded-lg"
                >
                  <div className="flex justify-between items-center p-3 md:p-4 border-b-[1px] border-[#eaeaf1]">
                    <p className="text-sm md:text-base text-[#323A70] font-medium">
                      {item?.title}
                    </p>
                    <IconStore.pencilEdit className="size-4 stroke-2 cursor-pointer stroke-purple-500" />
                  </div>
                  <p className="p-3 md:p-4 max-w-[150px] text-xs md:text-sm">
                    {item?.address}
                  </p>
                  <p className="p-3 md:p-4 border-t-[1px] text-xs md:text-sm border-[#eaeaf1]">
                    {item?.phoneNumber}
                  </p>
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
