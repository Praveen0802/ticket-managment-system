import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../../public/logo.svg";
import Button from "@/components/commonComponents/button";
import { VerifyEmail } from "@/utils/apiHandler/request";

const ConfirmEmailFold = ({ token }) => {
  const [loader, setLoader] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleVerify = async () => {
    setLoader(true);
    setError("");

    try {
      const body = {
        token: token,
      };
      const response = await VerifyEmail("", body);
      setVerifySuccess(true);
      setLoader(false);
    } catch (error) {
      console.error("Error verifying email:", error);
      setError("Failed to verify email. Please try again or contact support.");
      setLoader(false);
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6 px-6 md:px-8 justify-center items-center py-6 md:py-8 bg-white w-full rounded-xl">
      <Image
        src={logo}
        width={80}
        height={80}
        alt="image-logo"
        className="w-20 h-20 md:w-28 md:h-28"
      />
      <div className="text-center flex flex-col gap-2 md:gap-3">
        <p className="text-[#323A70] text-xl md:text-2xl font-semibold">
          Confirm Your Email
        </p>
        <p className="text-[#7D82A4] text-sm font-normal">
          Click the button below to verify your email address
        </p>
      </div>

      {verifySuccess ? (
        <div className="flex flex-col gap-4 items-center w-full max-w-xs mx-auto">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-green-700 font-medium">
              Email Verified Successfully!
            </p>
            <p className="text-green-600 text-sm mt-1">
              Your email has been verified. You can now log in to your account.
            </p>
          </div>
          <Button
            label="Go to Login"
            type="secondary"
            classNames={{
              root: "justify-center items-center",
              label_: "text-base text-center w-full font-medium",
            }}
            onClick={goToLogin}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full max-w-xs mx-auto">
          {error && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}
          <Button
            label="Verify Email"
            type="primary"
            classNames={{
              root: "justify-center items-center",
              label_: "text-base text-center w-full font-medium",
            }}
            onClick={handleVerify}
            loading={loader}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailFold;
