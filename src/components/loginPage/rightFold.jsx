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
    <div className="flex flex-col gap-6 px-6 md:px-8 justify-center items-center py-6 md:py-8 bg-white w-full md:w-1/2 rounded-b-xl md:rounded-bl-none md:rounded-r-xl">
      <div className="text-center flex flex-col gap-2 md:gap-3">
        <p className="text-[#323A70] text-xl md:text-2xl font-semibold">
          Login
        </p>
        <p className="text-[#7D82A4] text-sm font-normal">
          Connecting trusted ticket sellers together with our worldwide
          distribution network
        </p>
      </div>

      <form
        className="flex flex-col gap-6 w-full max-w-xs mx-auto"
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
              autoComplete="off"
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
              root: "justify-center items-center",
              label_: "text-base text-center w-full font-medium",
            }}
            submitButton={true}
            loading={loader}
          />
          <p className="text-sm cursor-pointer hover:underline text-center text-[#130061] font-medium">
            Forgot Password?
          </p>
        </div>
      </form>
    </div>
  );
};

export default RightFold;
