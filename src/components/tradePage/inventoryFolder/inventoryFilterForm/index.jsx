import FormFields from "@/components/formFieldsComponent";
import Image from "next/image";
import oneHand from "../../../../../public/One-hand.svg";
import grayQuestion from "../../../../../public/gray-question.svg";
import grayExclamatory from "../../../../../public/gray-exclamatory.svg";
import download from "../../../../../public/gray-download.svg";
import React from "react";

const InventoryFilterForm = (props) => {
  const { formFieldValues, handleChange, filters } = props;

  const categoryOptions = filters?.seat_categories?.map((category) => ({
    value: category?.stadium_seat_id,
    label: category?.seat_category,
  }));
  const quantityOptions = filters?.quantity_options?.map((quantity) => ({
    value: quantity,
    label: quantity,
  }));
  const ticketTypeOptions = filters?.ticket_types?.map((tickets) => ({
    value: tickets?.id,
    label: tickets?.name,
  }));

  const formValues = [
    {
      label: "Category",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "category",
      name: "category",
      value: formFieldValues?.category,
      onChange: (e) => handleChange(e, "category", "select", true),
      className: "py-[4px] px-4",
      parentClassName: "w-full md:w-45",
      labelClassName: "!text-[13px] text-gray-600  block",
      multiselect: true,
      options: categoryOptions,
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
      className: "py-[4px] px-4",
      parentClassName: "w-full md:w-45",
      labelClassName: "!text-[13px] text-gray-600  block",
      options: quantityOptions,
    },
    {
      label: "Ticket Type",
      type: "select",
      searchable: true,
      mandatory: true,
      id: "ticket_type_id",
      name: "ticket_type_id",
      value: formFieldValues?.ticket_type_id,
      onChange: (e) => handleChange(e, "ticket_type_id", "select", true),
      className: "py-[4px] px-4",
      parentClassName: "w-full md:w-45",
      labelClassName: "!text-[13px] text-gray-600 block",
      multiselect: true,
      options: ticketTypeOptions,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <FormFields formFields={formValues} />
    </div>
  );
};

export default InventoryFilterForm;
