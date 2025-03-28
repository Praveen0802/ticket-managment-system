import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import RightViewModal from "../commonComponents/rightViewModal";
import AddEditAddress from "./components/addEditAddress";
import Button from "../commonComponents/button";
import { fetchAddressBookDetails } from "@/utils/apiHandler/request";
import AddressList from "./components/addressView/addressList";
import AddressView from "./components/addressView";

// Shimmer loader component
const ShimmerLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 w-36 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-36 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-36 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const AddressBook = (props) => {
  const { primaryAddress, defaultAddress, profileDetails, fetchCountries } =
    props;
  const [primaryAddressData, setPrimaryAddressData] = useState(primaryAddress);
  const [addressBookDetails, setAddressBookDetails] = useState(defaultAddress);
  const [addressViewPopup, setAddressViewPopup] = useState({
    show: false,
    type: "",
  });
  const [editAdressValues, setEditAdressValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const primaryValues = primaryAddressData?.map((item) => {
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
    setIsLoading(true);
    try {
      const response = await fetchAddressBookDetails("", item?.id);
      setEditAdressValues({ id: item?.id, ...response });
      setAddressViewPopup({
        show: true,
        type: "edit",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = async (submit) => {
    if (submit?.submit) {
      setIsLoading(true);
      try {
        const primaryAddress = await fetchAddressBookDetails(
          '',
          "",
          "GET",
          "",
          {
            is_primary_address: 1,
          }
        );
        const defaultAddress = await fetchAddressBookDetails(
          '',
          "",
          "GET",
          "",
          {
            is_primary_address: 0,
          }
        );
        setPrimaryAddressData(primaryAddress);
        setAddressBookDetails(defaultAddress);
      } finally {
        setIsLoading(false);
      }
    }
    setAddressViewPopup({ show: false, type: "" });
    setEditAdressValues();
  };

  return (
    <div className="flex flex-col h-full">
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-semibold">
        Address book
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] flex-1 overflow-auto">
        <div className="p-3 md:p-6 flex flex-col gap-4 md:gap-6">
          {isLoading ? (
            <ShimmerLoader />
          ) : (
            <>
              <AddressView
                title="Primary address"
                handleEditClick={handleEditClick}
                addressValues={primaryValues}
              />

              <AddressView
                title="Default address"
                handleEditClick={handleEditClick}
                addressValues={addressValues}
              />

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
            </>
          )}
        </div>
      </div>
      <RightViewModal
        show={addressViewPopup?.show}
        onClose={handleClosePopup}
        className={"w-[600px]"}
        outSideClickClose={false}
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