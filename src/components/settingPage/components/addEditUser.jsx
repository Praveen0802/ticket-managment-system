import React, { useEffect, useState } from "react";
import Button from "@/components/commonComponents/button";
import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import {
  fetchCityBasedonCountry,
  fetchUserDetails,
} from "@/utils/apiHandler/request";
import { toast } from "react-toastify";

const AddEditUser = ({
  onClose,
  type,
  userDetails = {},
  fetchCountries = [],
}) => {
  const {
    id = "",
    first_name = "",
    last_name = "",
    email = "",
    mobile_number = "",
    phone_code = 91,
    address = "",
    city_id = "",
    zip_code = "",
    country_id = "",
  } = userDetails;

  const editType = type === "edit";
  const [loader, setLoader] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  const [formFieldValues, setFormFieldValues] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    mobile_number: mobile_number,
    phone_code: phone_code,
    address: address,
    country: country_id,
    city: city_id,
    zipCode: zip_code,
  });

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const value = selectType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const fetchCityDetails = async (id) => {
    if (id) {
      const response = await fetchCityBasedonCountry("", { country_id: id });
      const cityField =
        response?.length > 0
          ? response?.map((list) => {
              return { value: list?.id, label: list?.name };
            })
          : [];
      setCityOptions(cityField);
    }
  };

  useEffect(() => {
    fetchCityDetails(formFieldValues?.country);
  }, [formFieldValues?.country]);

  const isFormValid = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "mobile_number",
      "country",
      "city",
      "zipCode",
    ];
    return requiredFields.every((field) => formFieldValues[field]);
  };

  // Prepare country and city lists for dropdown
  const countryList = fetchCountries?.map((list) => ({
    value: list?.id,
    label: list?.name,
  }));

  // Consistent field styling with mobile responsiveness
  const fieldStyle =
    "w-full rounded-md border border-gray-200 p-3 text-gray-700 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none transition-all duration-200 mobile:text-sm";

  // Form fields configuration
  const userFormFields = [
    {
      label: "First Name",
      type: "text",
      id: "first_name",
      mandatory: true,
      name: "first_name",
      value: formFieldValues?.first_name,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      placeholder: "Enter first name",
    },
    {
      label: "Last Name",
      type: "text",
      id: "last_name",
      mandatory: true,
      name: "last_name",
      value: formFieldValues?.last_name,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      placeholder: "Enter last name",
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      mandatory: true,
      name: "email",
      value: formFieldValues?.email,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      placeholder: "Enter email address",
    },
    {
      label: "Phone",
      type: "custom",
      id: "phone_section",
      customComponent: (
        <div className="flex space-x-2 w-full">
          <div className="w-1/4">
            <FormFields
              formFields={[
                {
                  type: "select",
                  id: "phone_code",
                  name: "phone_code",
                  value: formFieldValues?.phone_code,
                  onChange: handleChange,
                  className: `!py-2 !px-4 ${fieldStyle}`,
                  labelClassName:
                    "font-medium text-gray-500 mb-1 mobile:text-sm",
                  options: [{ value: 91, label: "+91" }], // You can expand this list
                },
              ]}
            />
          </div>
          <div className="w-3/4">
            <FormFields
              formFields={[
                {
                  type: "text",
                  id: "mobile_number",
                  mandatory: true,
                  name: "mobile_number",
                  value: formFieldValues?.mobile_number,
                  onChange: handleChange,
                  className: `!py-2 !px-4 ${fieldStyle}`,
                  labelClassName:
                    "font-medium text-gray-500 mb-1 mobile:text-sm",
                  placeholder: "Enter mobile number",
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Address",
      type: "text",
      id: "address",
      name: "address",
      value: formFieldValues?.address,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      placeholder: "Enter address",
    },
    {
      label: "Country",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "country",
      name: "country",
      value: formFieldValues?.country,
      onChange: handleChange,
      className: `!py-2 !px-4 ${fieldStyle}`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      options: countryList,
    },
    {
      label: "City",
      type: "select",
      id: "city",
      name: "city",
      searchable: true,
      mandatory: true,
      value: formFieldValues?.city,
      onChange: handleChange,
      disabled: !formFieldValues?.country,
      className: `!py-2 !px-4 ${fieldStyle} ${
        !formFieldValues?.country ? "opacity-60" : ""
      }`,
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
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
      labelClassName: "font-medium text-gray-500 mb-1 mobile:text-sm",
      placeholder: "Enter postal code",
    },
  ];

  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      first_name: formFieldValues.first_name,
      last_name: formFieldValues.last_name,
      email: formFieldValues.email,
      mobile_number: formFieldValues.mobile_number,
      phone_code: formFieldValues.phone_code,
      address: formFieldValues.address,
      city: formFieldValues.city,
      zip_code: formFieldValues.zipCode,
      country: formFieldValues.country,
    };

    try {
      const response = await fetchUserDetails(
        "",
        editType ? id : "",
        editType ? "PUT" : "POST",
        payload
      );
      await toast.success(
        `User ${editType ? "updated" : "added"} successfully`
      );
      onClose({ submit: true });
    } catch (error) {
      toast.error(`Error in ${editType ? "updating" : "adding"} user`);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg relative bg-white mobile:w-[95%] mobile:mx-auto">
      <div className="flex p-4 border-b border-gray-200 justify-between items-center rounded-t-lg mobile:p-3">
        <h2 className="text-xl text-[#323A70] font-semibold mobile:text-lg">
          {editType ? "Edit" : "Add"} User
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-5 text-gray-600 mobile:size-4" />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6 mobile:p-4 mobile:gap-4">
        <FormFields formFields={userFormFields} />
      </div>

      <div className="fixed bottom-0 w-full px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-3 mobile:px-4 mobile:py-3">
        <Button
          label="Cancel"
          type="secondary"
          onClick={onClose}
          classNames={{
            root: "py-2 px-4 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-all duration-200 mobile:px-3 mobile:py-2",
            label_: "text-sm font-medium text-gray-700 mobile:text-xs",
          }}
        />
        <Button
          label={`${editType ? "Update" : "Save"} User`}
          type="primary"
          disabled={!isFormValid()}
          loading={loader}
          onClick={handleSubmit}
          classNames={{
            root: `py-2 px-6 rounded-md transition-all duration-200 mobile:px-4 mobile:py-2 ${
              isFormValid()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-200 cursor-not-allowed"
            }`,
            label_: `text-sm font-medium mobile:text-xs ${
              isFormValid() ? "text-white" : "text-[#323A70]"
            }`,
          }}
        />
      </div>
    </div>
  );
};

export default AddEditUser;
