import { convertSnakeCaseToCamelCase } from "@/utils/helperFunctions";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";
import DisplayValues from "./displayValues";

const OrderValues = ({ orderObject }) => {
  return (
    <div className="border-[1px] border-[#E0E1EA]">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#323A70] border-b-[1px] border-[#E0E1EA]">
        Order Details
      </p>
      <div className="p-4 grid grid-cols-2 gap-4">
        {Object?.entries(orderObject)?.map(([key, value], index) => {
          const copyKeys = key == "order_id";
          const pendingOrder =
            key == "order_status" && value?.toLowerCase() == "pending";
          const deliveryKey = key == "delivery_by";
          return (
            <DisplayValues
              text={convertSnakeCaseToCamelCase(key)}
              copyKeys={copyKeys}
              pendingOrder={pendingOrder}
              deliveryKey={deliveryKey}
              value={value}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderValues;
