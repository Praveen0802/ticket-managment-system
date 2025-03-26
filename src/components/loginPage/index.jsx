import React from "react";
import Design from "../../../public/design.svg";
import Image from "next/image";
import LeftFold from "./leftFold";
import RightFold from "./rightFold";

const LoginPage = () => {
  return (
    <div className="bg-[#130061] w-full min-h-screen flex items-center justify-center py-8 px-4 relative">
      {/* <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row min-h-[432px] z-10 relative"> */}
      {/* <LeftFold /> */}
      <div className="w-[500px] z-[10]">
        <RightFold />
      </div>
      {/* </div> */}
      <Image
        src={Design}
        className="w-full absolute bottom-0 left-0"
        width={100}
        height={180}
        alt="background design"
        priority
      />
    </div>
  );
};

export default LoginPage;
