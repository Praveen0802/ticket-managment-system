import React from "react";
import Image from "next/image";
import { useState } from "react";
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

const LeftMenuBar = ({}) => {
  const [showFullDisplay, setShowFullDisplay] = useState(false);
  const leftPaneValues = [
    { image: arrowRight, name: "Minimise" },
    { text: "MJ", name: "MJ" },
    { image: category, name: "Dashboard" },
    { image: addSquare, name: "Add Listings" },
    { image: listing, name: "My listings" },
    { image: shopping, name: "document" },
    { image: diagram, name: "Sales" },
    { image: ticketStar, name: "Reports" },
    { image: ticket, name: "TX Pay" },
    { image: documentupload, name: "TX Trade" },
  ];

  const [active, setActive] = useState(5);

  const handleSelectedClick = (index) => {
    if (index === 0) {
      setShowFullDisplay(!showFullDisplay);
      return;
    }
    setActive(index);
  };

  return (
    <div
      className={`bg-[#130061] flex flex-col justify-between transition-all duration-300 ${
        showFullDisplay ? "w-[200px]" : "w-[60px]"
      } h-[100vh]`}
    >
      <div>
        <div className="h-[80px] px-[10px] py[-[20px] border-b-[1px] border-[#51428E] flex items-center justify-center">
          <Image src={logo} alt="logo" width={40} height={40} />
        </div>
        <div className="flex flex-col p-[10px] gap-3">
          {leftPaneValues.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectedClick(index)}
              className={`cursor-pointer flex gap-3 items-center p-[6px] transition-colors duration-200 ${
                index === active
                  ? " bg-[#00A3ED] rounded-md"
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
