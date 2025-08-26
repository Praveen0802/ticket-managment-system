import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import Overview from "./overview";
import { useRouter } from "next/router";
import MyAccountTeam from "./myAccountTeam";
import MyTeamView from "./myTeamView";
import TXPay from "./txPay";
import useIsMobile from "@/utils/helperFunctions/useIsmobile";
import ChangePassword from "./changePassword";
import AddressBook from "./addressBook";
import BankAccounts from "./bankAccounts";
import LinkedCards from "./linkedCards";
import TicketDelivery from "./ticketDelivery";

const SettingsPage = (props) => {
  const { profile, apiData } = props;
  const [activeTab, setActiveTab] = useState(profile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  const isMobile = useIsMobile();

  const IconclassName = "size-6";
  const profileValues = [
    {
      icon: <IconStore.profile className={IconclassName} />,
      title: "My Account",
      key: "myAccount",
    },
    {
      icon: <IconStore.password className={IconclassName} />,
      title: "Change Password",
      key: "changepassword",
    },
    {
      icon: <IconStore.myContacts className={IconclassName} />,
      title: "Address Book",
      key: "addressBook",
    },

    // {
    //   icon: <IconStore.profile className={IconclassName} />,
    //   title: "My Customers",
    //   key: "myCustomers",
    // },
    {
      icon: <IconStore.tickets className={IconclassName} />,
      title: "Ticket Delivery",
      key: "ticketDelivery",
    },
    {
      icon: <IconStore.cards className={IconclassName} />,
      title: "Linked Cards",
      key: "linkedCards",
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
    // overview: <Overview />,
    myAccount: <MyAccountTeam {...apiData} />,
    changepassword: <ChangePassword {...apiData} />,
    addressBook: <AddressBook {...apiData} />,
    bankAccounts: <BankAccounts {...apiData} />,
    myCustomers: <MyTeamView {...apiData} />,
    linkedCards: <LinkedCards {...apiData} />,
    ticketDelivery: <TicketDelivery {...apiData} />,
    // txPay: <TXPay />,
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
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t overflow-x-auto border-gray-200 flex justify-around items-center py-2 z-10">
            {profileValues?.map((value, index) => (
              <div
                key={index}
                className={`flex flex-col min-w-[80px] w-[100px] justify-center items-center p-2 ${
                  activeTab === value?.key ? "text-[#130061]" : "text-gray-500"
                }`}
                onClick={() => handleTabClick(value?.key)}
              >
                {value?.icon}
                <span className="text-xs mt-1 text-center">{value.title}</span>
              </div>
            ))}
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
                    activeTab == value?.key ? "text-[#130061]" : "text-gray-600"
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
