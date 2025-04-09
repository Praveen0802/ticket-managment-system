import FormFields from "@/components/formFieldsComponent";
import Image from "next/image";
import oneHand from "../../../../../public/One-hand.svg";
import grayQuestion from "../../../../../public/gray-question.svg";
import grayExclamatory from "../../../../../public/gray-exclamatory.svg";
import download from "../../../../../public/gray-download.svg";
import React from "react";

const InventoryFilterForm = (props) => {
  const { formFieldValues, handleChange } = props;

  const formValues = [
    {
      label: "Category",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "category",
      name: "category",
      value: formFieldValues?.category,
      onChange: (e) => handleChange(e, "category", "select"),
      className: "py-2 px-4",
      parentClassName: "w-full md:w-55",
      labelClassName: "text-sm text-gray-600 mb-1 block",
      options: [{ value: "", label: "Select category" }],
    },
    {
      label: "Quantity",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "quantity",
      name: "quantity",
      value: formFieldValues?.quantity,
      onChange: (e) => handleChange(e, "quantity", "select"),
      className: "py-2 px-4",
      parentClassName: "w-full md:w-55",
      labelClassName: "text-sm text-gray-600 mb-1 block",
      options: [{ value: "", label: "Select quantity" }],
    },
    {
      label: "Ticket Type",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "ticket_type",
      name: "ticket_type",
      value: formFieldValues?.ticket_type,
      onChange: (e) => handleChange(e, "ticket_type", "select"),
      className: "py-2 px-4",
      parentClassName: "w-full md:w-55",
      labelClassName: "text-sm text-gray-600 mb-1 block",
      options: [{ value: "", label: "Select ticket_type" }],
    },
    {
      type: "checkbox",
      label: "Tickets in hand",
      beforeIcon: <Image width={16} height={16} src={oneHand} alt="hand" />,
      afterIcon: (
        <Image width={16} height={16} src={grayExclamatory} alt="hand" />
      ),
      id: "ticketsInHand",
      name: "ticketsInHand",
      checked: formFieldValues?.ticketsInHand,
      onChange: (e) => handleChange(e, "ticketsInHand", "checkbox"),
      className: "md:w-55",
      parentClassName: "w-full md:w-auto flex items-center",
    },
    {
      type: "checkbox",
      label: "Instant Download",
      beforeIcon: (
        <Image width={16} height={16} src={download} alt="download" />
      ),
      id: "instantDownload",
      name: "instantDownload",
      checked: formFieldValues?.instantDownload,
      onChange: (e) => handleChange(e, "instantDownload", "checkbox"),
      className: "md:w-55",
      parentClassName: "w-full md:w-auto flex items-center",
    },
    {
      type: "checkbox",
      label: "New Listings",
      afterIcon: (
        <Image width={16} height={16} src={grayQuestion} alt="question" />
      ),
      id: "newListings",
      name: "newListings",
      checked: formFieldValues?.newListings,
      onChange: (e) => handleChange(e, "newListings", "checkbox"),
      className: "md:w-55",
      parentClassName: "w-full md:w-auto flex items-center",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <FormFields formFields={formValues} />
    </div>
  );
};

export default InventoryFilterForm;
