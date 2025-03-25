import React, { useEffect, useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import {
  fetchAddressBookDetails,
  fetchCityBasedonCountry,
} from "@/utils/apiHandler/request";
import { toast } from "react-toastify";

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
    city_id,
    zip_code = "",
  } = addressDetails;
  const editType = type === "edit";
  const [loader, setLoader] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [formFieldValues, setFormFieldValues] = useState({
    address_title: "",
    address_line_1: address,
    address_line_2: "",
    address_line_3: "",
    country: country_id,
    city: city_id,
    zipCode: zip_code,
  });

  const fetchCityDetails = async (id) => {
    const response = await fetchCityBasedonCountry("", { country_id: id });
    console.log(response, "responseresponse");
    const cityField =
      response?.length > 0
        ? response?.map((list) => {
            return { value: list?.id, label: list?.name };
          })
        : [];
    setCityOptions(cityField);
  };

  useEffect(() => {
    fetchCityDetails(formFieldValues?.country);
  }, [formFieldValues?.country]);

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const value = selectType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const isFormValid = () => {
    const requiredFields = ["address_line_1", "country", "city", "zipCode"];
    return requiredFields.every((field) => formFieldValues[field]);
  };

  const countryList = fetchCountries?.map((list) => {
    return { value: list?.id, label: list?.name };
  });

  const fieldStyle =
    "w-full rounded-md border border-gray-200 p-3 text-gray-700 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none transition-all duration-200";

  const addressFormFields = [
    [
      {
        label: "Address Title",
        type: "text",
        id: "address_title",
        name: "address_title",
        value: formFieldValues?.address_title,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Home, Office, etc.",
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
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Street address",
      },
      {
        label: "Address Line 2",
        type: "text",
        id: "address_line_2",
        name: "address_line_2",
        value: formFieldValues?.address_line_2,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Apartment, suite, unit, etc. (optional)",
      },
      {
        label: "Address Line 3",
        type: "text",
        id: "address_line_3",
        name: "address_line_3",
        value: formFieldValues?.address_line_3,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Additional info (optional)",
      },
    ],
    [
      {
        label: "Country",
        type: "select",
        mandatory: true,
        id: "country",
        name: "country",
        value: formFieldValues?.country,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        options: countryList,
      },
    ],
    [
      {
        label: "City",
        type: "select",
        id: "city",
        mandatory: true,
        name: "city",
        value: formFieldValues?.city,
        onChange: handleChange,
        disabled: !formFieldValues?.country,
        className: `!py-2 !px-4 ${fieldStyle} ${
          !formFieldValues?.country ? "opacity-60" : ""
        }`,
        labelClassName: "font-medium text-gray-500 mb-1",
        options: cityOptions,
      },
      {
        label: "Zip Code",
        type: "text",
        mandatory: true,
        id: "zipCode",
        name: "zipCode",
        value: formFieldValues?.zipCode,
        onChange: handleChange,
        className: `!py-2 !px-4 ${fieldStyle}`,
        labelClassName: "font-medium text-gray-500 mb-1",
        placeholder: "Postal / Zip code",
      },
    ],
  ];

  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      address: `${formFieldValues?.address_line_1} ${formFieldValues?.address_line_2} ${formFieldValues?.address_line_3}`,
      city: formFieldValues?.city,
      // state: "Tamilnadu",
      zip_code: formFieldValues?.zipCode,
      country: formFieldValues?.country,
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
    } catch {
      toast.error("Error in Saving Address");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg relative bg-white">
      <div className="flex p-4 border-b border-gray-200 justify-between items-center rounded-t-lg">
        <h2 className="text-xl text-[#323A70] font-semibold">
          {editType ? "Edit" : "Add"} Address
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-5 text-gray-600" />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div className="w-full md:w-1/2">
          <FormFields formFields={addressFormFields[0]} />
        </div>

        <div className="flex flex-col gap-6">
          <FormFields formFields={addressFormFields[1]} />
        </div>

        <div className="w-full md:w-1/2">
          <FormFields formFields={addressFormFields[2]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormFields formFields={[addressFormFields[3][0]]} />
          <FormFields formFields={[addressFormFields[3][1]]} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-3">
        <Button
          label="Cancel"
          type="secondary"
          onClick={onClose}
          classNames={{
            root: "py-2 px-4 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-all duration-200",
            label_: "text-sm font-medium text-gray-700",
          }}
        />
        <Button
          label="Save Address"
          type="primary"
          disabled={!isFormValid()}
          loading={loader}
          onClick={handleSubmit}
          classNames={{
            root: `py-2 px-6 rounded-md transition-all duration-200 ${
              isFormValid()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-200 cursor-not-allowed"
            }`,
            label_: `text-sm font-medium ${
              isFormValid() ? "text-white" : "text-[#323A70]"
            }`,
          }}
        />
      </div>
    </div>
  );
};

export default AddEditAddress;
