import { useRouter } from "next/router";
import React, { useState } from "react";
import SelectListItem from "./components/selectListItem";
import TradeHome from "./tradeFolders/home";
import TrackingPage from "./trackingFolder";
import PurchaseFolder from "./purchaseFolder";
import InventoryFolder from "./inventoryFolder";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import EventSearch from "./components/eventSearch";

const TradePage = (props) => {
  const { profile } = props;
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(profile);
  const [showEventSearch, setShowEventSearch] = useState(false);
  const tabFields = [
    { name: "Home", key: "home", icon: "", route: "/home" },
    { name: "Inventory", icon: "", key: "inventory", route: "/inventory" },
    { name: "Tracking", icon: "", key: "tracking", route: "/tracking" },
    { name: "Purchase", icon: "", key: "purchase", route: "/purchase" },
  ];

  const handleSelectItemClick = (item) => {
    setSelectedTab(item?.key);
    router?.push(`/trade/${item?.route}`);
  };

  const selectedSubComponents = {
    home: <TradeHome {...props} />,
    tracking: <TrackingPage {...props} />,
    purchase: <PurchaseFolder {...props} />,
    inventory: <InventoryFolder {...props} />,
  };

  return (
    <div className="bg-[#ECEDF2] w-full h-full overflow-auto">
      <div className={`flex gap-[4px] w-[70%] px-[24px] pt-[24px]`}>
        {tabFields?.map((item, index) => {
          const selectedIndex = item?.key == selectedTab;
          return (
            <SelectListItem
              key={index}
              item={item}
              selectedIndex={selectedIndex}
              handleSelectItemClick={handleSelectItemClick}
            />
          );
        })}
      </div>
      <div className="relative h-full flex">
        {!showEventSearch && (
          <div
            onClick={() => setShowEventSearch(!showEventSearch)}
            className={`absolute top-10 ${
              showEventSearch ? "left-[265px]" : "-left-11"
            } cursor-pointer -translate-y-1/2 -rotate-90 transform origin-center transition-all duration-300`}
          >
            <div className="px-3 flex items-center gap-1 py-2 bg-[#3E2E7E] rounded-md">
              <p className="text-white text-xs font-medium">Event Search</p>
              <IconStore.chevronDown
                className={`stroke-white text-white size-3 transition-transform duration-300 ${
                  showEventSearch ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        )}

        <div
          className={`transition-all duration-300 
 overflow-hidden ${showEventSearch ? "w-[300px]" : "w-0"}`}
        >
          <EventSearch onClose={() => setShowEventSearch(false)} />
        </div>
        <div
          className={`transition-all duration-300 ${
            showEventSearch ? "w-[calc(100%-300px)] ml-[0px]" : "w-full ml-0"
          }`}
        >
          {selectedSubComponents?.[selectedTab]}
        </div>
      </div>
    </div>
  );
};

export default TradePage;
