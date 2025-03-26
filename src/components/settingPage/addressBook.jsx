import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import RightViewModal from "../commonComponents/rightViewModal";
import AddEditAddress from "./components/addEditAddress";
import Button from "../commonComponents/button";
import { fetchAddressBookDetails } from "@/utils/apiHandler/request";

const AddressBook = (props) => {
  const { addressDetails, profileDetails, fetchCountries } = props;
  const [addressBookDetails, setAddressBookDetails] = useState(addressDetails);
  const [addressViewPopup, setAddressViewPopup] = useState({
    show: false,
    type: "",
  });

  const [editAdressValues, setEditAdressValues] = useState();

  const addressValues = addressBookDetails?.map((item) => {
    const title = `Address - ${item.zip_code || "N/A"}`;
    const address = [
      item?.address || "N/A",
      item?.city || "N/A",
      item?.state || "N/A",
      item?.country || "N/A",
      item?.zip_code || "N/A",
    ]
      .filter((part) => part !== "N/A")
      .join(" ");

    const phoneNumber =
      profileDetails?.phone_code && profileDetails?.mobile_number
        ? `+${profileDetails.phone_code} ${profileDetails.mobile_number}`
        : "N/A";

    return {
      title,
      address: address || "N/A",
      phoneNumber,
      id: item?.id || "N/A",
    };
  });

  const handleEditClick = async (item) => {
    const response = await fetchAddressBookDetails("", item?.id);
    setEditAdressValues({ id: item?.id, ...response });
    setAddressViewPopup({
      show: true,
      type: "edit",
    });
  };

  const handleClosePopup = async (submit) => {
    if (submit?.submit) {
      const response = await fetchAddressBookDetails();
      setAddressBookDetails(response);
    }
    setAddressViewPopup({ show: false, type: "" });
    setEditAdressValues();
  };

  return (
    <div className="h-[90%]">
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        Address book
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] h-full">
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6">
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
                        handleEditClick(item);
                      }}
                      className="size-4 stroke-2 cursor-pointer stroke-[#130061]"
                    />
                  </div>
                  <p className="p-3 md:p-4 max-w-[150px] min-h-[150px] w-full text-xs md:text-sm">
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
        onClose={handleClosePopup}
        className={"w-[600px]"}
        outSideClickClose={true}
      >
        <AddEditAddress
          type={addressViewPopup?.type}
          addressDetails={editAdressValues}
          onClose={handleClosePopup}
          fetchCountries={fetchCountries}
        />
      </RightViewModal>
    </div>
  );
};

export default AddressBook;
