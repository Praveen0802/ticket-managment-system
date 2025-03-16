import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import Overview from "./overview";
import { useRouter } from "next/router";
import MyAccountTeam from "./myAccountTeam";
import MyTeamView from "./myTeamView";

const SettingsPage = (props) => {
  const [activeTab, setActiveTab] = useState(props?.profile);

  const router = useRouter();

  const IconclassName = "size-3 stroke-purple-600";
  const profileValues = [
    {
      icon: <IconStore.profile className={IconclassName} />,
      title: "Overview",
      key: "overview",
    },
    {
      icon: <IconStore.profile className={IconclassName} />,
      title: "My Account",
      key: "myAccount",
    },
    {
      icon: <IconStore.users className={IconclassName} />,
      title: "My Team",
      key: "myTeam",
    },
    {
      icon: <IconStore.profile className={IconclassName} />,
      title: "TX Pay",
      key: "txPay",
    },
    {
      icon: <IconStore.userPlus className={IconclassName} />,
      title: "My Referrals",
      key: "myReferrals",
    },
    {
      icon: <IconStore.profile className={IconclassName}/>,
      title: "Request A Feature",
      key: "requestAFeature",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router?.push(`/settings/${tab}`);
  };

  const stepperComponent = {
    overview: <Overview />,
    myAccount: <MyAccountTeam />,
    myTeam: <MyTeamView />,
    // txPay: <TXPay />,
    // myReferrals: <MyReferrals />,
    // requestAFeature: <RequestAFeature />,
  };

  return (
    <div className="bg-[#F5F7FA] h-full">
      <div className="flex h-full">
        {/* Fixed left sidebar - no overflow */}
        <div className="bg-white  shadow pl-4 pr-8 py-8 h-full">
          <ul className="flex flex-col gap-[25px] list-none">
            {profileValues.map((value, index) => (
              <li
                key={index}
                className={`flex ${
                  activeTab == value?.key ? "text-purple-600" : "text-gray-600"
                } items-center gap-3 cursor-pointer`}
                onClick={() => handleTabClick(value?.key)}
              >
                {value?.icon}
                <span>{value.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto">
          {stepperComponent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
