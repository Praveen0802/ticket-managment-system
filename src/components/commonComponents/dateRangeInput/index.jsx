import React, { useState, useEffect, useRef } from "react";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import FloatingPlaceholder from "@/components/floatinginputFields/floatingplaceolder";

const FloatingDateRange = ({
  label,
  value = { startDate: "", endDate: "" },
  onChange,
  id,
  keyValue,
  name,
  required = false,
  mandatory = false,
  labelClassName = "",
  parentClassName = "",
  readOnly,
  className = "",
  error = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(value.startDate || "");
  const [endDate, setEndDate] = useState(value.endDate || "");
  const [displayValue, setDisplayValue] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const dropdownRef = useRef(null);

  // Format and set display value when value prop changes
  useEffect(() => {
    if (value?.startDate && value?.endDate) {
      const formattedStart = formatDate(value.startDate);
      const formattedEnd = formatDate(value.endDate);
      setDisplayValue(`${formattedStart} - ${formattedEnd}`);
      setStartDate(value.startDate);
      setEndDate(value.endDate);
      setCurrentMonth(new Date(value.startDate));
    } else {
      setDisplayValue("");
      setStartDate("");
      setEndDate("");
    }
  }, [value]);

  // Update focus state when display value changes
  useEffect(() => {
    setIsFocused(displayValue ? true : false);
  }, [displayValue]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "/");
  };

  const handleInputClick = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
      setIsFocused(true);
      // Reset temp dates when opening
      setTempStartDate(startDate ? new Date(startDate) : null);
      setTempEndDate(endDate ? new Date(endDate) : null);
    }
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      const formattedStart = tempStartDate.toISOString().split("T")[0];
      const formattedEnd = tempEndDate.toISOString().split("T")[0];
      setStartDate(formattedStart);
      setEndDate(formattedEnd);
      setDisplayValue(
        `${formatDate(formattedStart)} - ${formatDate(formattedEnd)}`
      );

      if (onChange) {
        onChange(
          { startDate: formattedStart, endDate: formattedEnd },
          keyValue
        );
      }
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setTempStartDate(null);
    setTempEndDate(null);
    setDisplayValue("");
    if (onChange) {
      onChange({ startDate: "", endDate: "" }, keyValue);
    }
    setIsOpen(false);
  };

  const handleDateClick = (date) => {
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      // If no start date selected or both are selected, start new selection
      setTempStartDate(date);
      setTempEndDate(null);
    } else if (date < tempStartDate) {
      // If selected date is before start date, make it the new start date
      setTempStartDate(date);
      setTempEndDate(null);
    } else {
      // Otherwise set as end date
      setTempEndDate(date);
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

    const prevMonthDays = new Date(year, month, 0).getDate();
    const nextMonthDays = 42 - (daysInMonth + startingDay); // 6 weeks display

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      const day = prevMonthDays - startingDay + i + 1;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isSelected: false,
        isInRange: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected =
        tempStartDate && tempEndDate
          ? date >= tempStartDate && date <= tempEndDate
          : tempStartDate
          ? date.getTime() === tempStartDate.getTime()
          : false;

      days.push({
        date,
        day: i,
        isCurrentMonth: true,
        isSelected: isSelected,
        isInRange:
          tempStartDate &&
          tempEndDate &&
          date > tempStartDate &&
          date < tempEndDate,
      });
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: false,
        isSelected: false,
        isInRange: false,
      });
    }

    return (
      <div className={`w-full`}>
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-0.5 text-xs rounded cursor-pointer hover:bg-gray-100"
          >
            &lt;
          </button>
          <div className="text-xs font-medium">
            {currentMonth.toLocaleDateString("default", {
              month: "short",
              year: "numeric",
            })}
          </div>
          <button
            onClick={() => navigateMonth(1)}
            className="p-0.5 cursor-pointer text-xs rounded hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-[10px] text-center mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
            <div key={day} className="font-medium text-gray-500 py-0.5">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {days.map((dayObj, index) => {
            const isSelected = dayObj.isSelected;
            const isInRange = dayObj.isInRange;
            const isToday =
              dayObj.date.toDateString() === new Date().toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(dayObj.date)}
                className={`h-6 rounded cursor-pointer text-[10px]
                  ${dayObj.isCurrentMonth ? "text-gray-800" : "text-gray-400"}
                  ${isSelected ? "bg-blue-600 text-white" : ""}
                  ${isInRange ? "bg-blue-100" : ""}
                  ${isToday ? "border border-blue-400" : ""}
                  hover:bg-blue-200
                `}
                disabled={!dayObj.isCurrentMonth}
              >
                {dayObj.day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const baseClasses = `block w-full px-2 py-2 text-xs  rounded border-[1px] focus:outline-none ${
    error ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] caret-[#022B50] ${
    error
      ? "border-red-500"
      : isFocused
      ? "border-[#DADBE5] focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
      : "border-[#DADBE5]"
  }`;

  return (
    <div className={`${parentClassName}  relative w-full`} ref={dropdownRef}>
      <FloatingPlaceholder
        className={`${labelClassName} !pl-5 ${readOnly && "bg-gray-100 "}`}
        isFocused={isFocused}
        hasError={!!error}
      >
        <span
          style={{ fontSize: isFocused ? "10px" : "11px" }}
          className={`${labelClassName} ${readOnly && "bg-gray-100"} ${
            error ? "text-red-500" : "text-[#808082]"
          }`}
        >
          {label}
          {mandatory ? "*" : ""}
        </span>
      </FloatingPlaceholder>

      <div className="relative">
        <div
          className="absolute left-2 z-[10] bg-white top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleInputClick}
        >
          <IconStore.calendar className="h-4 w-4" />
        </div>
        <input
          id={id}
          type="text"
          name={name}
          value={displayValue}
          readOnly
          onClick={handleInputClick}
          className={`!pl-8 ${baseClasses} ${
            readOnly && "bg-gray-100"
          }  cursor-pointer ${className}`}
          placeholder=""
          required={required}
        />
      </div>

      {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow w-full p-2">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700">
              {tempStartDate && tempEndDate
                ? `${formatDate(tempStartDate.toISOString())} - ${formatDate(
                    tempEndDate.toISOString()
                  )}`
                : tempStartDate
                ? `${formatDate(tempStartDate.toISOString())} - Select end date`
                : "Select start date"}
            </div>

            {renderCalendar()}

            <div className="flex justify-between pt-2">
              <button
                onClick={handleClear}
                className="px-2 py-1 cursor-pointer text-xs text-gray-700 hover:bg-gray-100 rounded"
              >
                Reset
              </button>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 cursor-pointer text-xs text-gray-700 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-2 py-1 text-xs cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={!tempStartDate || !tempEndDate}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingDateRange;
