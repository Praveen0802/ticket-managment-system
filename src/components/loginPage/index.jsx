import React, { useState } from "react";
import Design from "../../../public/design-1.svg";
import Image from "next/image";
import LeftFold from "./leftFold";
import RightFold from "./rightFold";
import logo from "../../../public/logo.png";

const LoginPage = (props) => {
  const { fetchedCountryCodes = [] } = props;
  const [signUpForm, setSignUpForm] = useState(false);

  return (
    <div className="bg-[#bababa] w-full min-h-screen  overflow-auto flex items-center justify-center py-3 sm:py-6 md:py-8 px-3 sm:px-4 relative">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 items-center justify-center  z-10 relative">
        <Image
          src={logo}
          width={200}
          height={170}
          alt="image-logo"
          className=" w-[300px] h-[90px] "
        />
        <div className="flex max-md:flex-col max-md:gap-4  min-h-[432px] z-10 relative">
          <LeftFold
            setSignUpForm={setSignUpForm}
            signUpForm={signUpForm}
            hideMobile={true}
          />
          <RightFold
            setSignUpForm={setSignUpForm}
            signUpForm={signUpForm}
            fetchedCountryCodes={fetchedCountryCodes}
          />
          <LeftFold setSignUpForm={setSignUpForm} signUpForm={signUpForm} />
        </div>
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

export default LoginPage;
