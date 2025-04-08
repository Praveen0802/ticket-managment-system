import React from "react";
import SignupForm from "./signUpform";
import LoginForm from "./loginForm";

const RightFold = ({ signUpForm, setSignUpForm }) => {
  return (
    <div className="flex flex-col gap-6 justify-center w-full md:w-1/2 items-center bg-white rounded-b-xl md:rounded-b-none md:rounded-r-xl p-6 md:p-8">
      <div
        className={` w-full mx-auto flex flex-col ${
          signUpForm ? "gap-6 max-w-sm" : "gap-8 max-w-[90%]"
        }`}
      >
        {signUpForm ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default RightFold;
