import React from "react";
import Design from "../../../public/design.svg";
import Image from "next/image";
import ResetPasswordFold from "./components/resetPasswordFold";

const ResetPasswordPage = (props) => {
  const { token } = props;
  return (
    <div className="bg-[#696D76] w-full min-h-screen flex items-center justify-center py-8 px-4 relative">
      <div className="w-[500px] z-[10]">
        <ResetPasswordFold token={token} />
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

export default ResetPasswordPage;
