import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";

const LeftFold = () => {
  return (
    <div className="bg-[#F0F1F5] w-full md:w-1/2 rounded-t-xl md:rounded-tr-none md:rounded-l-xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-8">
      <Image
        src={logo}
        width={80}
        height={80}
        alt="image-logo"
        className="w-20 h-20 md:w-28 md:h-28"
      />
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-xl md:text-2xl text-center font-bold text-[#323A70]">
          Don't have an account?
        </p>
        <p className="text-sm text-[#323A70] font-normal text-center">
          Whether you're a buyer or seller, List My Ticket gives you access to
          the world's most sought-after events.
        </p>
      </div>
      <button className="bg-[#130061] rounded-md text-white text-base font-medium py-3 px-6 md:px-8 w-full md:w-auto">
        Sign Up Now
      </button>
    </div>
  );
};

export default LeftFold;
