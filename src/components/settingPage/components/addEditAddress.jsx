import React, { useEffect, useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import {
  fetchAddressBookDetails,
  fetchCityBasedonCountry,
} from "@/utils/apiHandler/request";
import { toast } from "react-toastify";
import FooterButton from "@/components/footerButton";

const AddEditAddress = ({
  onClose,
  type,
  addressDetails = {},
  fetchCountries = [],
}) => {
  const {
    country = "",
    address = "",
    city = "",
    country_id = "",
    city_id = "",
    zip_code = "",
    address_type = "",
    primary_address = "",
    first_name = "",
    last_name = "",
    company_name = "",
  } = addressDetails;
  const editType = type === "edit";
  const [loader, setLoader] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [formFieldValues, setFormFieldValues] = useState({
    first_name: first_name,
    last_name: last_name,
    company_name: company_name,
    address_type: address_type,
    address_line_1: address,
    address_line_2: "",
    address_line_3: "",
    country: country_id,
    city: city_id,
    zipCode: zip_code,
    is_default: primary_address == 1 ? true : false,
  });

  const fetchCityDetails = async (id) => {
    if (!id) return;
    try {
      const response = await fetchCityBasedonCountry("", { country_id: id });
      const cityField =
        response?.length > 0
          ? response?.map((list) => {
              return { value: list?.id, label: list?.name };
            })
          : [];
      setCityOptions(cityField);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to load cities");
    }
  };

  useEffect(() => {
    if (formFieldValues?.country) {
      fetchCityDetails(formFieldValues?.country);
    }
  }, [formFieldValues?.country]);

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const value = selectType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormFieldValues({ ...formFieldValues, is_default: e.target.checked });
  };

  const isFormValid = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "address_line_1",
      "country",
      "city",
      "zipCode",
    ];
    return requiredFields.every((field) => formFieldValues[field]);
  };

  const countryList = fetchCountries?.map((list) => {
    return { value: list?.id, label: list?.name };
  });

  const fieldStyle =
    "w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:outline-none transition-all duration-200";

  const addressFormFields = [
    [
      {
        label: "First name",
        type: "text",
        id: "first_name",
        name: "first_name",
        mandatory: true,
        value: formFieldValues?.first_name,
        onChange: (e) => handleChange(e, "first_name"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        rightIcon: formFieldValues?.first_name
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
      {
        label: "Last name",
        type: "text",
        id: "last_name",
        name: "last_name",
        mandatory: true,
        value: formFieldValues?.last_name,
        onChange: (e) => handleChange(e, "last_name"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        rightIcon: formFieldValues?.last_name
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Company name",
        type: "text",
        id: "company_name",
        name: "company_name",
        value: formFieldValues?.company_name,
        onChange: (e) => handleChange(e, "company_name"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        rightIcon: formFieldValues?.company_name
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Address title",
        type: "text",
        id: "address_type",
        name: "address_type",
        value: formFieldValues?.address_type,
        onChange: (e) => handleChange(e, "address_type"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "Downtown Dubai - 12345",
        rightIcon: formFieldValues?.address_type
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Address Line 1",
        type: "text",
        id: "address_line_1",
        mandatory: true,
        name: "address_line_1",
        value: formFieldValues?.address_line_1,
        onChange: (e) => handleChange(e, "address_line_1"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "Downtown Dubai",
        rightIcon: formFieldValues?.address_line_1
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Address Line 2",
        type: "text",
        id: "address_line_2",
        name: "address_line_2",
        value: formFieldValues?.address_line_2,
        onChange: (e) => handleChange(e, "address_line_2"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "Dubai",
        rightIcon: formFieldValues?.address_line_2
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Address Line 3",
        type: "text",
        id: "address_line_3",
        name: "address_line_3",
        value: formFieldValues?.address_line_3,
        onChange: (e) => handleChange(e, "address_line_3"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "",
        rightIcon: formFieldValues?.address_line_3
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
    [
      {
        label: "Country",
        type: "select",
        mandatory: true,
        id: "country",
        searchable: true,
        name: "country",
        value: formFieldValues?.country,
        onChange: (e) => handleChange(e, "country", "select"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        options: countryList?.length
          ? countryList
          : [{ value: "", label: "United arab emirates" }],
      },
    ],
    [
      {
        label: "Town/City/State",
        type: "select",
        id: "city",
        mandatory: true,
        name: "city",
        disabled: !formFieldValues?.country,
        value: formFieldValues?.city,
        onChange: (e) => handleChange(e, "city", "select"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "Dubai",
        options: cityOptions,
        rightIcon: formFieldValues?.city
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
      {
        label: "Postcode/Zip",
        type: "text",
        mandatory: true,
        id: "zipCode",
        name: "zipCode",
        value: formFieldValues?.zipCode,
        onChange: (e) => handleChange(e, "zipCode"),
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "text-sm text-gray-600 mb-1 block",
        placeholder: "12345",
        rightIcon: formFieldValues?.zipCode
          ? () => (
              <span className="text-green-500">
                <IconStore.circleTick className="size-5" />
              </span>
            )
          : null,
      },
    ],
  ];

  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      first_name: formFieldValues.first_name,
      last_name: formFieldValues.last_name,
      company_name: formFieldValues.company_name,
      address: `${formFieldValues?.address_line_1 || ""} ${
        formFieldValues?.address_line_2 || ""
      } ${formFieldValues?.address_line_3 || ""}`.trim(),
      city: formFieldValues?.city,
      zip_code: formFieldValues?.zipCode,
      country: formFieldValues?.country,
      is_default: formFieldValues?.is_default,
      address_type: formFieldValues?.address_type || "",
      ...(formFieldValues?.is_default && { primary_address: 1 }),
    };

    try {
      const response = await fetchAddressBookDetails(
        "",
        editType ? addressDetails?.id : "",
        editType ? "PUT" : "POST",
        payload
      );
      toast.success("Address saved successfully");
      onClose({ submit: true });
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Error in Saving Address");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full max-w-3x flex flex-col gap-2 h-full mx-auto rounded-lg relative bg-white shadow-lg">
      <div className="flex px-4 py-2 border-b border-gray-200 justify-between items-center">
        <h2 className="text-[15px] font-semibold text-gray-800">
          {editType ? "Edit address" : "Add new address"}
        </h2>
        <button
          onClick={() => onClose({ submit: false })}
          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-5 text-gray-600" />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5 overflow-y-auto h-full">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFields formFields={[addressFormFields[0][0]]} />
          <FormFields formFields={[addressFormFields[0][1]]} />
        </div>

        {/* Company Name */}
        <div className="w-full">
          <FormFields formFields={addressFormFields[1]} />
        </div>

        {/* Address Title */}
        <div className="w-1/2">
          <FormFields formFields={addressFormFields[2]} />
        </div>

        {/* Address Line 1 */}
        <div className="w-full">
          <FormFields formFields={addressFormFields[3]} />
        </div>

        {/* Address Line 2 */}
        <div className="w-full">
          <FormFields formFields={addressFormFields[4]} />
        </div>

        {/* Address Line 3 */}
        <div className="w-full">
          <FormFields formFields={addressFormFields[5]} />
        </div>

        {/* Country */}
        <div className="w-full">
          <FormFields formFields={addressFormFields[6]} />
        </div>

        {/* City and Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFields formFields={[addressFormFields[7][0]]} />
          <FormFields formFields={[addressFormFields[7][1]]} />
        </div>

        <div className="flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            id="is_default"
            checked={formFieldValues.is_default}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
          />
          <label
            htmlFor="is_default"
            className="ml-2 cursor-pointer text-sm text-gray-700"
          >
            Use as default address?
          </label>
        </div>
      </div>

      <FooterButton
        isFormValid={isFormValid}
        onClose={() => onClose({ submit: false })}
        handleSubmit={handleSubmit}
        loader={loader}
      />
    </div>
  );
};

export default AddEditAddress;
