import React from "react";
import SignupForm from "./signUpform";
import LoginForm from "./loginForm";

const RightFold = ({ signUpForm, setSignUpForm, fetchedCountryCodes }) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center w-full md:w-1/2 items-center bg-white max-md:rounded-xl md:rounded-bl-none md:rounded-r-xl p-4 sm:p-6 md:p-8">
      <div
        className={`w-full mx-auto flex flex-col ${
          signUpForm ? "gap-4 sm:gap-5 md:gap-6 max-w-sm" : "gap-5 sm:gap-6 md:gap-8 max-w-[95%] sm:max-w-[90%]"
        }`}
      >
        {signUpForm ? (
          <SignupForm fetchedCountryCodes={fetchedCountryCodes} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default RightFold;