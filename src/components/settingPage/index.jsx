import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import Overview from "./overview";
import { useRouter } from "next/router";
import MyAccountTeam from "./myAccountTeam";
import MyTeamView from "./myTeamView";
import TXPay from "./txPay";
import useIsMobile from "@/utils/helperFunctions/useIsmobile";

const SettingsPage = (props) => {
  const { profile, apiData } = props;
  const [activeTab, setActiveTab] = useState(profile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  const isMobile = useIsMobile();

  const IconclassName = "size-6 stroke-[#130061]";
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
      icon: <IconStore.profile className={IconclassName} />,
      title: "Request A Feature",
      key: "requestAFeature",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router?.push(`/settings/${tab}`);

    // Close mobile menu when a tab is selected
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const stepperComponent = {
    overview: <Overview />,
    myAccount: <MyAccountTeam {...apiData}/>,
    myTeam: <MyTeamView />,
    txPay: <TXPay />,
    // myReferrals: <MyReferrals />,
    // requestAFeature: <RequestAFeature />,
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Get active tab title for mobile header
  const getActiveTabTitle = () => {
    const activeItem = profileValues.find((item) => item.key === activeTab);
    return activeItem?.title || "Settings";
  };

  return (
    <div className="bg-[#F5F7FA] h-full">
      {isMobile ? (
        <div className="flex flex-col h-full">
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform z-20 ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ top: "57px" }}
          >
            <div className="p-4">
              <ul className="flex flex-col gap-6 list-none">
                {profileValues.map((value, index) => (
                  <li
                    key={index}
                    className={`flex ${
                      activeTab == value?.key
                        ? "text-[#130061] font-semibold"
                        : "text-gray-600"
                    } items-center gap-3 cursor-pointer`}
                    onClick={() => handleTabClick(value?.key)}
                  >
                    {value?.icon}
                    <span>{value.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Overlay when menu is open */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-gray-100 bg-opacity-50 z-10"
              onClick={() => setMobileMenuOpen(false)}
              style={{ top: "57px" }} // Adjust based on your header height
            />
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {stepperComponent[activeTab]}
          </div>

          {/* Mobile Tab Bar - Alternative Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-10">
            {profileValues.slice(0, 4).map((value, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-2 ${
                  activeTab === value?.key ? "text-[#130061]" : "text-gray-500"
                }`}
                onClick={() => handleTabClick(value?.key)}
              >
                {value?.icon}
                <span className="text-xs mt-1">{value.title}</span>
              </div>
            ))}

            {/* More menu for additional items */}
            <div
              className="flex flex-col items-center p-2 text-gray-500"
              onClick={toggleMobileMenu}
            >
              <IconStore.menu className="size-6 stroke-current" />
              <span className="text-xs mt-1">More</span>
            </div>
          </div>

          {/* Bottom padding to account for the fixed tab bar */}
          <div className="h-16"></div>
        </div>
      ) : (
        // Desktop Layout (Original)
        <div className="flex h-full">
          {/* Fixed left sidebar - no overflow */}
          <div className="bg-white shadow pl-4 pr-8 py-8 h-full">
            <ul className="flex flex-col gap-[25px] list-none">
              {profileValues.map((value, index) => (
                <li
                  key={index}
                  className={`flex ${
                    activeTab == value?.key
                      ? "text-[#130061] font-semibold"
                      : "text-gray-600"
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
      )}
    </div>
  );
};

export default SettingsPage;
