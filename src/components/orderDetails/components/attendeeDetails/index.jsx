import FormFields from "@/components/formFieldsComponent";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlusCircle, X } from "lucide-react";

const AttendeeDetails = ({ attendee_details = [] }) => {
  const total = attendee_details?.length;
  const [attendees, setAttendees] = useState([
    { id: 1, isOpen: true, formData: {} },
  ]);

  const fieldStyle =
    "border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e, field, attendeeId, type = "input") => {
    setAttendees(
      attendees.map((attendee) => {
        if (attendee.id === attendeeId) {
          return {
            ...attendee,
            formData: {
              ...attendee.formData,
              [field]: type === "select" ? e.value : e.target.value,
            },
          };
        }
        return attendee;
      })
    );
  };

  const toggleAccordion = (id) => {
    setAttendees(
      attendees.map((attendee) => {
        if (attendee.id === id) {
          return { ...attendee, isOpen: !attendee.isOpen };
        }
        return attendee;
      })
    );
  };

  const addAttendee = () => {
    if (attendees.length < total) {
      const newId = Math.max(...attendees.map((a) => a.id)) + 1;
      setAttendees([...attendees, { id: newId, isOpen: true, formData: {} }]);
    }
  };

  const removeAttendee = (id) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter((attendee) => attendee.id !== id));
    }
  };

  const generateAttendeeFormFields = (attendeeId, attendeeData) => {
    return [
      [
        {
          label: "First Name",
          type: "text",
          id: `first_name_${attendeeId}`,
          mandatory: true,
          name: `first_name_${attendeeId}`,
          value: attendeeData.first_name || "",
          onChange: (e) => handleChange(e, "first_name", attendeeId),
          className: `!py-1 !px-4 ${fieldStyle}`,
          labelClassName: "!text-[12px] text-gray-600 block",
          placeholder: "Enter attendee first name",
          rightIcon: attendeeData.first_name
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
          label: "Last Name",
          type: "text",
          id: `last_name_${attendeeId}`,
          mandatory: true,
          name: `last_name_${attendeeId}`,
          value: attendeeData.last_name || "",
          onChange: (e) => handleChange(e, "last_name", attendeeId),
          className: `!py-1 !px-4 ${fieldStyle}`,
          labelClassName: "!text-[12px] text-gray-600 block",
          placeholder: "Enter attendee last name",
          rightIcon: attendeeData.last_name
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
          label: "Date Of Birth",
          type: "custom",
          id: `dob_section_${attendeeId}`,
          customComponent: (
            <div className="flex space-x-2 w-full">
              <div className="w-1/3">
                <FormFields
                  formFields={[
                    {
                      type: "text",
                      label: "DD",
                      id: `dob_day_${attendeeId}`,
                      name: `dob_day_${attendeeId}`,
                      value: attendeeData.dob_day || "",
                      onChange: (e) => {
                        // Allow only numbers and limit to 2 digits
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .substring(0, 2);
                        const syntheticEvent = {
                          target: { value, name: e.target.name },
                        };
                        handleChange(syntheticEvent, "dob_day", attendeeId);
                      },
                      className: `!py-1 !px-4 ${fieldStyle}`,
                      labelClassName: "!text-[12px] text-gray-600 block",
                      placeholder: "DD",
                    },
                  ]}
                />
              </div>
              <div className="w-1/3">
                <FormFields
                  formFields={[
                    {
                      type: "text",
                      id: `dob_month_${attendeeId}`,
                      label: "MM",
                      name: `dob_month_${attendeeId}`,
                      value: attendeeData.dob_month || "",
                      onChange: (e) => {
                        // Allow only numbers and limit to 2 digits
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .substring(0, 2);
                        const syntheticEvent = {
                          target: { value, name: e.target.name },
                        };
                        handleChange(syntheticEvent, "dob_month", attendeeId);
                      },
                      className: `!py-1 !px-4 ${fieldStyle}`,
                      labelClassName: "!text-[12px] text-gray-600 block",
                      placeholder: "MM",
                    },
                  ]}
                />
              </div>
              <div className="w-1/3">
                <FormFields
                  formFields={[
                    {
                      type: "text",
                      id: `dob_year_${attendeeId}`,
                      label: "YYYY",
                      name: `dob_year_${attendeeId}`,
                      value: attendeeData.dob_year || "",
                      onChange: (e) => {
                        // Allow only numbers and limit to 4 digits
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .substring(0, 4);
                        const syntheticEvent = {
                          target: { value, name: e.target.name },
                        };
                        handleChange(syntheticEvent, "dob_year", attendeeId);
                      },
                      className: `!py-1 !px-4 ${fieldStyle}`,
                      labelClassName: "!text-[12px] text-gray-600 block",
                      placeholder: "YYYY",
                    },
                  ]}
                />
              </div>
            </div>
          ),
        },
      ],
      [
        {
          label: "Nationality",
          type: "text",
          id: `nationality_${attendeeId}`,
          mandatory: true,
          name: `nationality_${attendeeId}`,
          value: attendeeData.nationality || "",
          onChange: (e) => handleChange(e, "nationality", attendeeId),
          className: `!py-1 !px-4 ${fieldStyle}`,
          labelClassName: "!text-[12px] text-gray-600 block",
          placeholder: "Nationality",
          rightIcon: attendeeData.nationality
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
          label: "Passport",
          type: "text",
          id: `passport_${attendeeId}`,
          mandatory: true,
          name: `passport_${attendeeId}`,
          value: attendeeData.passport || "",
          onChange: (e) => handleChange(e, "passport", attendeeId),
          className: `!py-1 !px-4 ${fieldStyle}`,
          labelClassName: "!text-[12px] text-gray-600 block",
          placeholder: "Enter attendee Passport",
          rightIcon: attendeeData.passport
            ? () => (
                <span className="text-green-500">
                  <IconStore.circleTick className="size-5" />
                </span>
              )
            : null,
        },
      ],
    ];
  };

  return (
    <div className="flex flex-col gap-4">
      {attendees.map((attendee) => {
        const attendeeFields = generateAttendeeFormFields(
          attendee.id,
          attendee.formData
        );
        const isComplete =
          attendee.formData.first_name &&
          attendee.formData.last_name &&
          attendee.formData.nationality &&
          attendee.formData.passport &&
          attendee.formData.dob_day &&
          attendee.formData.dob_month &&
          attendee.formData.dob_year;

        return (
          <div
            key={attendee.id}
            className="border border-gray-300 rounded-md overflow-hidden"
          >
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-50 cursor-pointer"
              onClick={() => toggleAccordion(attendee.id)}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Attendee {attendee.id}
                  {isComplete && (
                    <span className="text-green-500 ml-2">
                      <IconStore.circleTick className="size-5 inline" />
                    </span>
                  )}
                </span>
                {attendee.formData.first_name &&
                  attendee.formData.last_name && (
                    <span className="text-gray-500">
                      ({attendee.formData.first_name}{" "}
                      {attendee.formData.last_name})
                    </span>
                  )}
              </div>
              <div className="flex items-center gap-2">
                {attendees.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAttendee(attendee.id);
                    }}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                )}
                {attendee.isOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>

            {attendee.isOpen && (
              <div className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormFields formFields={[attendeeFields[0][0]]} />
                    <FormFields formFields={[attendeeFields[1][0]]} />
                  </div>

                  <div className="w-full">
                    <label className="text-sm text-gray-600 mb-1 block">
                      Date Of Birth
                    </label>
                    <FormFields formFields={[attendeeFields[2][0]]} />
                  </div>

                  <div className="w-full">
                    <FormFields formFields={[attendeeFields[3][0]]} />
                  </div>

                  <div className="w-full">
                    <FormFields formFields={[attendeeFields[4][0]]} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {attendees.length < total && (
        <button
          onClick={addAttendee}
          className="flex cursor-pointer items-center justify-center gap-2 text-blue-600 hover:text-blue-800 py-2 px-4 border border-dashed border-blue-300 rounded-md self-start mt-2"
        >
          <PlusCircle size={18} />
          <span>Add Attendee</span>
        </button>
      )}
    </div>
  );
};

export default AttendeeDetails;
