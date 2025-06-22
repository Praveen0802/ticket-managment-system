import React from "react";
import Design from "../../../public/design.svg";
import Image from "next/image";
import ConfirmEmailFold from "./confirmEmailFold";
import logo from "../../../public/logo.png";

const ConfirmEmailPage = (props) => {
  const { token } = props;
  return (
    <div className="bg-[#f3f4f6] w-full min-h-screen flex items-center justify-center py-8 px-4 relative">
      <div className="w-[500px] z-[10] flex flex-col gap-4 items-center justify-center">
        <Image
          src={logo}
          width={200}
          height={170}
          alt="image-logo"
          className=" w-[300px] h-[90px] md:w-[400px] md:h-[120px]"
        />
        <ConfirmEmailFold token={token} />
      </div>
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

export default ConfirmEmailPage;
