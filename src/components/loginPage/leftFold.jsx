import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";
import Button from "../commonComponents/button";

const LeftFold = ({ signUpForm, setSignUpForm }) => {
  const toggleForm = () => {
    setSignUpForm(!signUpForm);
  };

  return (
    <div className="bg-[#F0F1F5] w-full md:w-1/2 rounded-t-xl md:rounded-tr-none md:rounded-l-xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-6">
      <Image
        src={logo}
        width={200}
        height={170}
        alt="image-logo"
        className="w-20 h-20 md:w-[200px] md:h-[130px]"
      />
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-xl md:text-2xl text-center font-bold text-[#323A70]">
          {signUpForm ? "Already have an account?" : "Don't have an account?"}
        </p>
        <p className="text-sm text-[#323A70] font-normal text-center">
          {signUpForm
            ? "Log in to access your account and manage your ticket listings or purchases."
            : "Whether you're a buyer or seller, List My Ticket gives you access to the world's most sought-after events."}
        </p>
      </div>
      <Button
        label={signUpForm ? "Login" : "Sign Up Now"}
        classNames={{
          root: "bg-[#130061] rounded-md items-center justify-center py-3 px-6 md:px-8 w-full ",
          label_: "text-white text-base font-medium text-center",
        }}
        onClick={toggleForm}
      />
    </div>
  );
};

export default LeftFold;
