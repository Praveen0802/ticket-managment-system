import React from "react";
import FloatingLabelInput from "../../floatinginputFields";
import PhoneInputComponent from "../../commonComponents/phoneInputComponent";

const AccounInfoForm = ({
  formData,
  handleChange,
  countryCode,
  handleCountryCodeChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-[90%] lg:w-[80%]">
      <FloatingLabelInput
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        keyValue={"firstName"}
        value={formData?.firstName}
        className="!p-2"
        onChange={handleChange}
        required
      />
      <FloatingLabelInput
        id="lastName"
        name="lastName"
        type="text"
        keyValue={"lastName"}
        label="Last Name"
        value={formData?.lastName}
        className="!p-2"
        onChange={handleChange}
        required
      />
      <FloatingLabelInput
        id="email"
        name="email"
        type="email"
        label="email"
        keyValue={"email"}
        readOnly
        value={formData?.email}
        className="!p-2"
        onChange={handleChange}
        required
      />
      <PhoneInputComponent
        value={formData?.phoneNumber}
        onChange={handleChange}
        countryCode={countryCode}
        keyValue="phoneNumber"
        onCountryCodeChange={handleCountryCodeChange}
        placeholder="Phone number"
      />
    </div>
  );
};

export default AccounInfoForm;
