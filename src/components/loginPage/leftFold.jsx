import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";
import Button from "../commonComponents/button";

const LeftFold = ({ signUpForm, setSignUpForm }) => {
  const toggleForm = () => {
    setSignUpForm(!signUpForm);
  };

  return (
    <div className="bg-[#F0F1F5] w-full md:w-1/2 rounded-t-xl md:rounded-tr-none md:rounded-l-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6">
      <Image
        src={logo}
        width={200}
        height={170}
        alt="image-logo"
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-[200px] md:h-[90px]"
      />
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
        <p className="text-lg sm:text-xl md:text-2xl text-center font-bold text-[#343432]">
          {signUpForm ? "Already have an account?" : "Don't have an account?"}
        </p>
        <p className="text-xs sm:text-sm text-[#343432] font-normal text-center">
          {signUpForm
            ? "Log in to access your account and manage your ticket listings or purchases."
            : "Whether you're a buyer or seller, seats Brokers gives you access to the world's most sought-after events."}
        </p>
      </div>
      <Button
        label={signUpForm ? "Login" : "Sign Up Now"}
        classNames={{
          root: "bg-[#343432] rounded-md items-center justify-center py-2 sm:py-3 px-4 sm:px-6 md:px-8 w-full ",
          label_: "text-white text-sm sm:text-base font-medium text-center",
        }}
        onClick={toggleForm}
      />
    </div>
  );
};

export default LeftFold;
