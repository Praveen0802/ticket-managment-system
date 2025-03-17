import React from "react";

const AccountView = ({ account, className }) => {
  const { root = "" } = className;

  return (
    <div className={`flex flex-col gap-3 ${root}`}>
      <p className="text-[14px] font-medium">{account.type}</p>
      <div className="flex flex-col border border-gray-200 rounded-md">
        {account.fields.map((field, index) => (
          <div
            key={index}
            className="flex p-3 items-center justify-between border-b border-gray-200 last:border-none"
          >
            <div className="flex flex-col gap-1">
              {field.title && (
                <p className="text-[14px] font-medium">{field.title}</p>
              )}
              {field.label && (
                <p className="text-[12px] text-gray-600">{field.label}</p>
              )}
              {field.value && (
                <p className="text-[12px] font-medium">{field.value}</p>
              )}
            </div>
            {field.icon && <div className="ml-2">{field.icon}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountView;
