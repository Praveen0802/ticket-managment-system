import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";

const LeftFold = () => {
  return (
    <div className="bg-[#F0F1F5] w-[50%] rounded-tl-xl rounded-bl-xl p-[40px] flex flex-col items-center justify-center gap-[32px]">
      <Image src={logo} width={112} height={112} alt="image-logo" />
      <div className="flex flex-col gap-[12px] ">
        <p className="text-[24px] text-center font-bold text-[#323A70]">
          Don’t have an account?
        </p>
        <p className="text-[14px] text-[#323A70] font-normal text-center">
          Whether you're a buyer or seller, List My Ticket gives you access to
          the world's most sought-after events.
        </p>
      </div>
      <button className="bg-[#130061] rounded-md text-white text-[16px] font-medium py-[12.5px] px-[100px]">
        Sign Up Now
      </button>
    </div>
  );
};

export default LeftFold;
