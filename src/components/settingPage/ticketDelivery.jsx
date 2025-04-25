import React, { useState } from "react";
import ToggleStatus from "../tradePage/inventoryFolder/components/toggleStatus";
import { postPartnerSetting } from "@/utils/apiHandler/request";
import { toast } from "react-toastify";

const TicketDelivery = (props) => {
  const { partnerDetails = {} } = props;
  const [selectedItem, setSelectedItem] = useState(
    partnerDetails?.email_status
  );
  const listItems = [
    { label: "Customer", key: "customer" },
    { label: "Partner", key: "partner" },
  ];
  const handleToggle = async (item) => {
    setSelectedItem(item?.key);
    await postPartnerSetting("", { email_status: item?.key });
    toast.success('Partner setting updated successfully');
  };
  return (
    <div className="h-[90%] max-w-full">
      <p className="pb-4 text-base sm:text-lg md:text-xl p-3 md:p-4 font-medium">
        Ticket Delivery Status
      </p>
      <div className="bg-white border-[1px] border-[#eaeaf1] h-full p-4 flex flex-col gap-4">
        <p>Set your ticket delivery preference – deliver to the customer or to the partner</p>
        <div className="w-[30%]">
          <ToggleStatus
            listItems={listItems}
            selectedItem={selectedItem}
            onClick={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDelivery;
