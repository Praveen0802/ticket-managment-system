import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";

const DisplayValues = ({
  text,
  orderObject = {},
  orderStatusKey,
  copyKeys,
  deliveryKey,
  value,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const orderFullfilled = orderObject?.["order_status"] == "fulfilled";
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-normal text-[#7D82A4]">{text}</p>
      <p
        className={`flex items-center justify-between ${
          copyKeys ? "bg-[#F4F5F8] px-1 py-0.5 rounded-md" : ""
        } ${
          orderStatusKey &&
          `${
            orderFullfilled ? "bg-green-600" : "bg-[#F57B1B]"
          } text-white w-fit px-0.5 py-0.5 rounded-sm`
        }
         ${
           deliveryKey &&
           `${
             orderFullfilled ? "bg-green-100 " : "bg-[#FFF4EC]"
           } px-1 py-0.5 rounded-md w-fit`
         } text-sm font-normal text-[#343432]`}
      >
        {value}
        {copyKeys && (
          <div className="flex items-center">
            {copied ? (
              <span className="text-green-500 text-xs mr-1">Copied!</span>
            ) : null}
            <button
              onClick={handleCopy}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <IconStore.check className="size-4 text-green-500" />
              ) : (
                <IconStore.copy className="size-4 cursor-pointer" />
              )}
            </button>
          </div>
        )}
      </p>
    </div>
  );
};

export default DisplayValues;
