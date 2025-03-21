import React, { Fragment } from "react";
import FloatingSelect from "../floatinginputFields/floatingSelect";
import FloatingLabelInput from "../floatinginputFields";

const FormFields = ({ formFields }) => {
  return (
    <>
      {formFields?.map((field, index) => {
        return (
          <Fragment key={index}>
            {field?.type === "select" ? (
              <FloatingSelect
                label={field?.label}
                options={field?.options}
                selectedValue={field?.value}
                onSelect={field?.onChange}
                paddingClassName={field?.className} // Wider horizontal padding
              />
            ) : field?.type === "text" ? (
              <FloatingLabelInput
                id={field?.id}
                name={field?.name}
                type={field?.type}
                label="Search by Payment Refrence"
                className={field?.className}
                value={field?.value}
                onChange={(e) => field?.onChange(e)}
                autoComplete="off"
                required
              />
            ) : (
              <></>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default FormFields;
