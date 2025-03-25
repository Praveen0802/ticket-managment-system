import React, { Fragment } from "react";
import FloatingSelect from "../floatinginputFields/floatingSelect";
import FloatingLabelInput from "../floatinginputFields";
import FloatingFileUpload from "../floatinginputFields/floatingFIleUpload";

const FormFields = ({ formFields }) => {
  return (
    <>
      {formFields?.map((field, index) => {
        return (
          <Fragment key={index}>
            {field?.type === "select" ? (
              <FloatingSelect
                label={field?.label}
                keyValue={field?.name || field?.key}
                options={field?.options}
                mandatory={field?.mandatory}
                selectedValue={field?.value}
                labelClassName={field?.labelClassName}
                disabled={field?.disabled}
                onSelect={field?.onChange}
                paddingClassName={field?.className} // Wider horizontal padding
              />
            ) : field?.type === "text" || field?.type === "password" ? (
              <FloatingLabelInput
                id={field?.id}
                name={field?.name}
                keyValue={field?.name}
                type={field?.type}
                label={field?.label}
                labelClassName={field?.labelClassName}
                mandatory={field?.mandatory}
                readOnly={field?.disabled}
                className={field?.className}
                value={field?.value}
                onChange={field?.onChange}
                autoComplete="off"
                required
              />
            ) : field?.type === "file" ? (
              <FloatingFileUpload
                id={field?.id}
                name={field?.name}
                keyValue={field?.name}
                label={field?.label}
                labelClassName={field?.labelClassName}
                mandatory={field?.mandatory}
                disabled={field?.disabled}
                className={field?.className}
                value={field?.value}
                onChange={field?.onChange}
                accept={field?.accept}
                buttonText={field?.buttonText || "Upload File"}
                allowedFileTypes={field?.allowedFileTypes}
                maxFileSize={field?.maxFileSize || 5}
              />
            ) : field?.render ? (
              field.render()
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
