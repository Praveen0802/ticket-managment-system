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
    <div className="grid grid-cols-2 gap-4 w-[80%]">
      <FloatingLabelInput
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        value={formData?.firstName}
        className="!p-2"
        onChange={handleChange}
        required
      />
      <FloatingLabelInput
        id="lastName"
        name="lastName"
        type="text"
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
        onCountryCodeChange={handleCountryCodeChange}
        placeholder="Phone number"
      />
    </div>
  );
};

export default AccounInfoForm;
