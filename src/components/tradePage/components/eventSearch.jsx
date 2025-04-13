import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SearchedList from "./searchedList";
import { FetchEventSearch, FetchVenue } from "@/utils/apiHandler/request";
import SelectDateComponent from "./selectDateComponent";

// Shimmer Effect Component
const ShimmerItem = () => (
  <div className="p-4 border-b border-[#E0E1EA]">
    <div className="flex flex-col gap-2">
      <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
      <div className="flex gap-2 items-center">
        <div className="w-1/4 h-3 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-1/5 h-3 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="w-1/2 h-3 bg-gray-200 animate-pulse rounded"></div>
    </div>
  </div>
);

const EventSearch = ({ onClose, allCategories }) => {
  const [formFieldValues, setFormFieldValues] = React.useState({
    event_date: "",
    country: "",
    venue: "",
    event_categories: "",
    any_date: "",
  });

  const displayDropdownRef = useRef(null);

  const [displayEventValues, setDisplayEventValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [venueOptions, setVenueOptions] = useState([]);

  const [filtersApplied, setFiltersApplied] = useState({ q: "" });

  const fetchApiCall = async (params) => {
    setLoading(true);
    const response = await FetchEventSearch("", params);
    setDisplayEventValues(response);
    setLoading(false);
  };

  const handleClickReset = () => {
    setLoading(true);
    const initialValues = {
      event_date: "",
      country: "",
      venue: "",
      event_categories: "",
      any_date: "",
    };
    setFormFieldValues(initialValues);
    setDisplayEventValues([]);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const venueSearch = async (params) => {
    const response = await FetchVenue("", params);
    setVenueOptions(response);
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchEventSearch = debounce((fetchFunction, params) => {
    fetchFunction(params);
  }, 500);

  const categoriesList = allCategories?.map((item) => {
    return {
      value: item?.id,
      label: item?.name,
      tournament: item?.is_tournament,
    };
  });

  const handleChange = async (e, key, type, selectedObject) => {
    const selectType = type === "select";
    const dateType = type === "date"; // Fixed equality check
    const value = selectType || dateType ? e : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });

    if (key === "event_date") {
      const updatedQueryValues = {
        ...filtersApplied,
        ...(value && { q: value }),
      };
      setFiltersApplied(updatedQueryValues);
      debouncedFetchEventSearch(fetchApiCall, updatedQueryValues);
    }
    if (key === "venue" && !value) {
      debouncedFetchEventSearch(venueSearch, { params: value });
    }
    if (key == "event_categories") {
      const updatedQueryValues = {
        ...filtersApplied,
        is_tournament: selectedObject?.is_tournament,
        category_id: selectedObject?.id,
      };
      setFiltersApplied(updatedQueryValues);
      fetchApiCall(updatedQueryValues);
    }
  };

  const handleVenueViewClick = async (params, name, type) => {
    setFormFieldValues({ ...formFieldValues, [type]: name });
    setFiltersApplied({ ...filtersApplied, ...params });
    await fetchApiCall(params);
    setVenueOptions([]);
  };

  const venueSearchEventComponent = () => (
    <div ref={displayDropdownRef} className="max-h-[250px] overflow-y-scroll">
      {venueOptions?.venue?.length > 0 && (
        <div className="flex flex-col border-b border-[#E0E1EA] pb-2 mb-2">
          <p className="text-sm py-1 px-2 font-semibold text-gray-700">Venue</p>
          <div className="flex flex-col gap-1">
            {venueOptions.venue.map((item, index) => (
              <p
                onClick={() => {
                  handleVenueViewClick(
                    { venue: item?.s_id },
                    item?.name,
                    "venue"
                  );
                }}
                key={index}
                className="px-2 py-1 text-sm text-gray-600 rounded cursor-pointer hover:bg-[#f0f1f6] transition-colors duration-150"
              >
                {item?.name}
              </p>
            ))}
          </div>
        </div>
      )}

      {venueOptions?.city?.length > 0 && (
        <div className="flex flex-col border-b border-[#E0E1EA] pb-2 mb-2">
          <p className="text-sm py-1 px-2 font-semibold text-gray-700">City</p>
          <div className="flex flex-col gap-1">
            {venueOptions.city.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  handleVenueViewClick(
                    { city: item?.city_id },
                    item?.name,
                    "venue"
                  );
                }}
                className="px-2 py-1 text-sm text-gray-600 rounded cursor-pointer hover:bg-[#f0f1f6] transition-colors duration-150"
              >
                {item?.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displayDropdownRef.current &&
        !displayDropdownRef.current.contains(event.target)
      ) {
        setVenueOptions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formValues = [
    {
      label: "Event/Performer",
      type: "text",
      id: "event_date",
      hideCalendarIcon: true,
      mandatory: true,
      singleDateMode: true,
      name: "event_date",
      value: formFieldValues?.event_date,
      onChange: (e) => handleChange(e, "event_date"),
      className: `!py-2 !px-4`,
      labelClassName: "text-sm text-gray-600  block",
      placeholder: "Enter Event/Performer",
    },
    {
      label: "Venue/City",
      type: "text",
      id: "venue",
      name: "venue",
      showDropdown: true,
      dropDownComponent: venueSearchEventComponent("venue"),
      // onBlur: handleVenueBlurChange,
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
      options: categoriesList,
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          {[1, 2, 3].map((item) => (
            <ShimmerItem key={item} />
          ))}
        </div>
      );
    } else if (displayEventValues?.events?.length > 0) {
      // Show the actual results when available
      return (
        <div className="flex flex-col gap-2">
          <p className="px-4 text-[13px] font-medium">Events</p>
          {displayEventValues.events.map((item, index) => (
            <SearchedList key={index} item={item} />
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDateChange = (key, dateRange) => {
    let updatedParams = {};
    if (key === "custom_range") {
      updatedParams = {
        start_date: dateRange?.startDate,
        end_date: dateRange?.endDate,
        date_format: "",
        any_date: "",
      };
    } else if (key === "any_date") {
      updatedParams = {
        start_date: "",
        end_date: "",
        date_format: "",
        any_date: dateRange?.date,
      };
    } else {
      updatedParams = {
        start_date: "",
        end_date: "",
        date_format: key,
        any_date: "",
      };
    }
    setFiltersApplied({ ...filtersApplied, ...updatedParams });
    fetchApiCall(updatedParams);
  };

  return (
    <div className="bg-white w-full h-full shadow-md border-r-[1px] border-[#E0E1EA] flex flex-col">
      <div className="flex justify-between items-center border-b-[1px] border-[#E0E1EA] p-4">
        <p className="text-[#323A70] text-[18px] font-semibold">Event Search</p>
        <div className="flex gap-2 items-center">
          <button onClick={handleClickReset} className="cursor-pointer">
            <IconStore.reload className="stroke-[#3E2E7E] size-4" />
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IconStore.close className="stroke-[#3E2E7E] size-4" />
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-[16px]">
        <FormFields formFields={formValues} />
        <SelectDateComponent
          label="Date Range"
          onChange={handleDateChange}
          selectedValue=""
          id="date-picker"
        />
      </div>
      <div className="overflow-y-auto flex-1">{renderContent()}</div>
    </div>
  );
};

export default EventSearch;
