import { IconStore } from "@/utils/helperFunctions/iconStore";
import { useState } from "react";
import Button from "../commonComponents/button";
import AccounInfoForm from "./components/accounInfoForm";
import RightViewModal from "../commonComponents/rightViewModal";
import AddEditAddress from "./components/addEditAddress";
import { fetchProfileDetails } from "@/utils/apiHandler/request";
import ChangePassword from "./components/changePassword";

const MyAccountTeam = (props) => {
  const { addressBookDetails, profileDetails } = props;

  const initialValues = {
    firstName: profileDetails?.first_name,
    lastName: profileDetails?.last_name,
    email: profileDetails?.email,
    phoneNumber: profileDetails?.mobile_number,
  };

  const [formData, setFormData] = useState(initialValues);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [changePasswordPopup, setChangePassWordPopup] = useState(false);

  const [addressViewPopup, setAddressViewPopup] = useState({
    show: false,
    type: "",
  });
  const [adressFormData, setAdressFormData] = useState({});

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

  const addressValues = addressBookDetails?.map((item) => {
    const title = `Address - ${item.zip_code}`;
    const address = `${item.address} ${item.city} ${item.state} ${item.country} ${item.zip_code}`;
    const phoneNumber = `+${profileDetails?.phone_code} ${profileDetails?.mobile_number}`;

    return {
      title,
      address,
      phoneNumber,
      id: item?.id,
    };
  });

  const updateProfileDetails = async () => {
    setSubmitLoader(true);
    const payload = {
      first_name: formData?.firstName,
      last_name: formData?.lastName,
      email: formData?.email,
      mobile_number: formData?.phoneNumber,
      phone_code: countryCode?.replace("+", ""),
    };
    const response = await fetchProfileDetails(null, "PUT", payload);
    // toast message
    setSubmitLoader(false);
  };

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
                onClick={() => {
                  setFormData(initialValues);
                }}
                classNames={{
                  root: "border-[1px] border-[#022B50] py-1 px-3 md:px-[14px]",
                  label_: "text-xs md:text-sm font-medium",
                }}
              />
              <Button
                label="Submit"
                onClick={() => {
                  updateProfileDetails();
                }}
                loading={submitLoader}
                classNames={{
                  root: "bg-[#130061] py-1 px-3 md:px-[14px]",
                  label_: "text-xs md:text-sm text-white font-normal",
                }}
              />
            </div>
          </div>
        </div>

        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6 border-[1px] border-[#eaeaf1]">
          <h3 className="text-base md:text-lg font-medium">Account password</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Change your account password
          </p>
          <Button
            label="Change Password"
            onClick={() => {
              setChangePassWordPopup(true);
            }}
            classNames={{
              root: "bg-[#130061] py-1 px-3 md:px-[14px] w-fit",
              label_: "text-xs md:text-sm text-white font-normal",
            }}
          />
        </div>

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
                    <IconStore.pencilEdit
                      onClick={() => {
                        setAddressViewPopup({
                          show: true,
                          type: "edit",
                        });
                      }}
                      className="size-4 stroke-2 cursor-pointer stroke-[#130061]"
                    />
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
          <Button
            label="+ Add New Address"
            onClick={() => {
              setAddressViewPopup({
                show: true,
                type: "add",
              });
            }}
            classNames={{
              root: "bg-[#130061] py-1 px-3 w-fit md:px-[14px]",
              label_: "text-xs md:text-sm text-white font-normal",
            }}
          />
        </div>
      </div>
      <RightViewModal
        show={addressViewPopup?.show}
        onClose={() => {
          setAddressViewPopup({ show: false, type: "" });
        }}
        className={"w-[500px]"}
        outSideClickClose={true}
      >
        <AddEditAddress
          type={addressViewPopup?.type}
          onClose={() => {
            setAddressViewPopup({ show: false, type: "" });
          }}
        />
      </RightViewModal>
      <ChangePassword
        show={changePasswordPopup}
        onClose={() => {
          setChangePassWordPopup(false);
        }}
        email={profileDetails?.email}
        outSideClickClose={true}
      />
    </div>
  );
};

export default MyAccountTeam;
