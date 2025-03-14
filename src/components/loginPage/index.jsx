import React from "react";
import Design from "../../../public/design.svg";
import Image from "next/image";
import LeftFold from "./leftFold";
import RightFold from "./rightFold";

const LoginPage = () => {
  return (
    <div className="bg-[#130061]  w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-[920px] mx-auto flex min-h-[432px] z-[99]">
        <LeftFold />
        <RightFold />
      </div>
      <Image
        src={Design}
        className="w-full absolute bottom-0 left-0"
        width={100}
        height={180}
        alt="logo"
      />
    </div>
  );
};

export default LoginPage;
