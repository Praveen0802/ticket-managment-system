import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";

import React from "react";
import Image from "next/image";
import SearchedList from "./searchedList";

const EventSearch = ({ onClose }) => {
  const [formFieldValues, setFormFieldValues] = React.useState({
    event_date: "",
    country: "",
    venue: "",
    event_categories: "",
    any_date: "",
  });

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const dateType = type == "date";
    const value = selectType || dateType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const formValues = [
    {
      label: "Event/Performer",
      type: "date",
      id: "event_date",
      hideCalendarIcon: true,
      mandatory: true,
      singleDateMode: true,
      name: "event_date",
      value: formFieldValues?.event_date,
      onChange: (e) => handleChange(e, "event_date", "date"),
      className: `!py-2 !px-4`,
      labelClassName: "text-sm text-gray-600  block",
      placeholder: "Select Date",
    },
    {
      label: "Country",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "country",
      name: "country",
      value: formFieldValues?.country,
      onChange: (e) => handleChange(e, "country", "select"),
      className: `!py-2 !px-4`,
      labelClassName: "text-sm text-gray-600  block",
      options: [{ value: "", label: "Select Country" }],
    },
    {
      label: "Venue/City",
      type: "text",
      id: "venue",
      name: "venue",
      value: formFieldValues?.venue,
      onChange: (e) => handleChange(e, "venue"),
      className: `!py-2 !px-4 `,
      labelClassName: "text-sm text-gray-600  block",
      placeholder: "Enter Venue/City",
    },
    {
      label: "All Event  Categories",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "event_categories",
      name: "event_categories",
      value: formFieldValues?.event_categories,
      onChange: (e) => handleChange(e, "event_categories", "select"),
      className: `!py-2 !px-4`,
      labelClassName: "text-sm text-gray-600  block",
      options: [{ value: "", label: "Select Event" }],
    },
    {
      label: "Any Date",
      type: "date",
      id: "any_date",
      mandatory: true,
      singleDateMode: true,
      hideCalendarIcon: true,
      name: "any_date",
      value: formFieldValues?.any_date,
      onChange: (e) => handleChange(e, "any_date", "date"),
      className: `!py-2 !px-4`,
      labelClassName: "text-sm text-gray-600  block",
      placeholder: "Select Date",
    },
  ];

  const response = [
    {
      name: "Chelsea vs Arsenal - Premier League",
      eventDate: "Sun, 10 Nov 2024",
      eventTime: "16:30 ",
      location: "Stamford Bridge, London",
    },
    {
      name: "Chelsea vs Arsenal - Premier League",
      eventDate: "Sun, 10 Nov 2024",
      eventTime: "16:30 ",
      location: "Stamford Bridge, London",
    },
  ];

  return (
    <div className="bg-white w-[300px] h-full shadow-md border-r-[1px] border-[#E0E1EA]">
      <div className="flex justify-between items-center border-b-[1px] border-[#E0E1EA] p-4">
        <p className="text-[#323A70] text-[18px] font-semibold">Event Search</p>
        <div className="flex gap-2 items-center">
          <button className="cursor-pointer">
            <IconStore.reload className="stroke-[#3E2E7E] size-4" />
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IconStore.close className="stroke-[#3E2E7E] size-4" />
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-[16px]">
        <FormFields formFields={formValues} />
      </div>
      {response?.length > 0 && (
        <div>
          {response?.map((item, index) => {
            return <SearchedList key={index} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
