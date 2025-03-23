import React, { useState } from "react";
import FloatingLabelInput from "../floatinginputFields";
import { useRouter } from "next/router";
import Button from "../commonComponents/button";
import AJAX from "@/utils/apiHandler";
import { API_ROUTES } from "@/utils/apiHandler/apiRoutes";
import { setCookie } from "@/utils/helperFunctions/cookie";
import { currentTimeEpochTimeInMilliseconds } from "@/utils/helperFunctions";
import { loginUser } from "@/utils/apiHandler/request";

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

  const handleChange = (e, key) => {
    const name = key;
    const { value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setLoader(true);
      const body = {
        user_name: formData.email,
        password: formData.password,
      };
      try {
        const response = await loginUser(null, body);
        const authToken = response?.token;
        if (authToken) {
          setCookie("auth_token", authToken);
          setCookie(
            "auth_token_validity",
            currentTimeEpochTimeInMilliseconds()
          );
          router.push("/dashboard");
        } else {
          setErrors({
            email: "Invalid email or password",
            password: "Invalid email or password",
          });
          setLoader(false);
        }
      } catch {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        setLoader(false);
      }
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
              keyValue={"email"}
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
              keyValue={"password"}
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
