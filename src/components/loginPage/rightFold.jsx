import React, { useState } from "react";
import FloatingLabelInput from "../floatinginputFields";
import { useRouter } from "next/router";
import Button from "../commonComponents/button";

const RightFold = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setLoader(true);
      console.log("Form submitted:", formData);
      // Proceed with login logic here
      router.push("/dashboard");
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="flex flex-col gap-[32px] px-[40px] justify-center items-center py-[32px] bg-white w-[50%] rounded-tr-xl rounded-br-xl">
      <div className="text-center flex flex-col gap-[12px] ">
        <p className="text-[#323A70] text-[24px] font-semibold">Login</p>
        <p className="text-[#7D82A4] text-[14px] font-normal">
          Connecting trusted ticket sellers together with our worldwide
          distribution network
        </p>
      </div>

      <form
        className="flex flex-col gap-6 w-[310px] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <FloatingLabelInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formData?.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <FloatingLabelInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData?.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            label={"Login"}
            type="primary"
            classNames={{
              root: " justify-center items-center",
              label_: " text-[16px] text-center w-full font-medium",
            }}
            submitButton={true}
            loading={loader}
          />
          <p className="text-[14px] cursor-pointer hover:underline text-center text-[#130061] font-medium">
            Forgot Password?
          </p>
        </div>
      </form>
    </div>
  );
};

export default RightFold;
