import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import arrowRight from "../../../public/arrow-right.svg";
import category from "../../../public/category.svg";
import addSquare from "../../../public/add-square.svg";
import diagram from "../../../public/diagram.svg";
import ticket from "../../../public/ticket.svg";
import documentupload from "../../../public/document-upload.svg";
import listing from "../../../public/listing.svg";
import shopping from "../../../public/shopping-cart-02.svg";
import logout from "../../../public/logout.svg";
import ticketStar from "../../../public/ticket-star.svg";
import { Menu } from "lucide-react";
import useIsMobile from "@/utils/helperFunctions/useIsmobile";
import { useRouter } from "next/router";

const LeftMenuBar = () => {
  const [showFullDisplay, setShowFullDisplay] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftPaneValues = [
    { image: arrowRight, name: "Minimise" },
    { text: "MJ", name: "MJ", key: "name", route: "settings/overview", },
    {
      image: category,
      name: "Dashboard",
      route: "dashboard",
      key: "dashboard",
    },
    { image: addSquare, name: "Add Listings", key: "addList" },
    { image: listing, name: "My listings", key: "myList" },
    { image: shopping, name: "document", key: "document" },
    { image: diagram, name: "Sales", key: "sales" },
    { image: ticketStar, name: "Reports", key: "reports" },
    { image: ticket, name: "TX Pay", key: "tx-pay" },
    { image: documentupload, name: "TX Trade", key: "tx-trade" },
  ];

  const router = useRouter();

  const isMobile = useIsMobile();

  console.log(router?.pathname);

  const [active, setActive] = useState(router?.pathname?.replace("/", ""));

  const handleSelectedClick = (index, item) => {
    if (index === 0 && !isMobile) {
      setShowFullDisplay(!showFullDisplay);
      return;
    }
    setActive(item?.key);

    // Close mobile menu when an item is selected
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    if (item?.route) {
      router.push(`/${item?.route}`);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Mobile bottom navigation - only show top 5 most important items
  const mobileNavItems = leftPaneValues.filter(
    (_, index) => index !== 0 && index !== 1 && index <= 6
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 bg-[#130061] h-16 flex items-center justify-between px-4 z-20">
          <Image src={logo} alt="logo" width={32} height={32} />
          <button onClick={toggleMobileMenu} className="p-2 text-white">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full bg-[#130061] w-64 transform transition-transform duration-300 ease-in-out z-30 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#51428E]">
            <Image src={logo} alt="logo" width={32} height={32} />
            <button onClick={toggleMobileMenu} className="p-2 text-white">
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="flex flex-col p-4 gap-4">
            {leftPaneValues
              .filter((_, index) => index !== 0)
              .map((item, idx) => {
                const index = idx + 1; // Adjust index to match original array
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectedClick(index, item)}
                    className={`cursor-pointer flex gap-3 items-center p-3 transition-colors duration-200 ${
                      item?.key === active
                        ? "bg-[#00A3ED] rounded-md"
                        : "hover:bg-[#5f6365] rounded-md"
                    }`}
                  >
                    {item?.image && (
                      <Image
                        src={item?.image}
                        alt="icon"
                        width={24}
                        height={24}
                      />
                    )}
                    {item?.text && (
                      <p className="text-[18px] font-medium text-[#FFFFFF]">
                        {item?.text}
                      </p>
                    )}
                    <div className="text-white capitalize text-[14px]">
                      {item?.name}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t border-[#51428E]">
            <div className="flex items-center gap-3 cursor-pointer p-3 hover:bg-[#5f6365] rounded-md">
              <Image src={logout} alt="logout" width={24} height={24} />
              <span className="text-white text-[14px]">Logout</span>
            </div>
          </div>
        </div>

        {/* Overlay when menu is open */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-200 bg-opacity-50 z-10"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Content padding to accommodate fixed header and footer */}
        <div className="pt-16 pb-16"></div>
      </>
    );
  }

  // Desktop view
  return (
    <div
      className={`bg-[#130061] flex flex-col justify-between transition-all duration-300 ${
        showFullDisplay ? "w-[200px]" : "w-[60px]"
      } h-[100vh]`}
    >
      <div>
        <div className="h-[80px] px-[10px] py-[20px] border-b-[1px] border-[#51428E] flex items-center justify-center">
          <Image src={logo} alt="logo" width={40} height={40} />
        </div>
        <div className="flex flex-col p-[10px] gap-3">
          {leftPaneValues.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectedClick(index, item)}
              className={`cursor-pointer flex gap-3 items-center p-[6px] transition-colors duration-200 ${
                item?.key === active
                  ? "bg-[#00A3ED] rounded-md"
                  : "hover:bg-[#5f6365] rounded-md"
              }`}
            >
              {item?.image && (
                <Image src={item?.image} alt="logo" width={24} height={24} />
              )}
              {item?.text && (
                <p className="text-[18px] font-medium text-[#FFFFFF]">
                  {item?.text}
                </p>
              )}
              {item?.name && (
                <div
                  className={`text-white capitalize text-[13px] whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    showFullDisplay
                      ? "max-w-[120px] opacity-100"
                      : "max-w-0 opacity-0"
                  }`}
                >
                  {item?.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-[10px]">
        <Image
          src={logout}
          alt="logo"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
        />
      </div>
    </div>
  );
};

export default LeftMenuBar;
