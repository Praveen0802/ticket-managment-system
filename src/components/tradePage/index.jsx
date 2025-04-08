import { useRouter } from "next/router";
import React, { useState } from "react";
import SelectListItem from "./components/selectListItem";
import TradeHome from "./tradeFolders/home";
import TrackingPage from "./trackingFolder";

const TradePage = (props) => {
  const { profile } = props;
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(profile);
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
  };

  return (
    <div className="bg-[#ECEDF2] w-full h-full overflow-auto p-[24px]">
      <div className="flex gap-[4px] w-[70%]">
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
      <div>{selectedSubComponents?.[selectedTab]}</div>
    </div>
  );
};

export default TradePage;
