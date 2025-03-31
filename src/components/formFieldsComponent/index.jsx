import React, { Fragment } from "react";
import FloatingSelect from "../floatinginputFields/floatingSelect";
import FloatingLabelInput from "../floatinginputFields";
import FloatingFileUpload from "../floatinginputFields/floatingFIleUpload";

const FormFields = ({ formFields }) => {
  return (
    <>
      {formFields?.map((field, index) => {
        const {
          type,
          label,
          id,
          name,
          value,
          onChange,
          className,
          labelClassName,
          mandatory,
          disabled,
          readOnly,
          options,
          searchable,
          placeholder,
          error,
          rightIcon,
          accept,
          buttonText,
          allowedFileTypes,
          maxFileSize,
          render,
          customComponent,
        } = field;

        const keyValue = field?.name || field?.key || id;

        return (
          <Fragment key={`${keyValue || index}`}>
            {type === "select" ? (
              <FloatingSelect
                label={label}
                id={id}
                name={name}
                keyValue={keyValue}
                options={options || []}
                mandatory={mandatory}
                selectedValue={value}
                labelClassName={labelClassName}
                searchable={searchable}
                disabled={disabled}
                onSelect={onChange}
                placeholder={placeholder}
                error={error}
                paddingClassName={className} // Using className for padding
              />
            ) : type === "text" || type === "password" || type === "email" ? (
              <FloatingLabelInput
                id={id}
                name={name}
                keyValue={keyValue}
                type={type}
                label={label}
                labelClassName={labelClassName}
                mandatory={mandatory}
                readOnly={readOnly || disabled}
                className={className}
                value={value}
                onChange={onChange}
                autoComplete="off"
                required={mandatory}
                placeholder={placeholder}
                error={error}
                rightIcon={rightIcon}
              />
            ) : type === "file" ? (
              <FloatingFileUpload
                id={id}
                name={name}
                keyValue={keyValue}
                label={label}
                labelClassName={labelClassName}
                mandatory={mandatory}
                disabled={disabled}
                className={className}
                value={value}
                onChange={onChange}
                accept={accept}
                buttonText={buttonText || "Upload File"}
                allowedFileTypes={allowedFileTypes}
                maxFileSize={maxFileSize || 5}
                error={error}
              />
            ) : type === "custom" && customComponent ? (
              <div className="w-full">
                
                {customComponent}
              </div>
            ) : render ? (
              render()
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