import { formatDateTime } from "@/utils/helperFunctions";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const DepositPopup = ({ onClose, data }) => {
  const formatDescription = (desc) => {
    if (!desc) return "";

    // Extract the date if available
    const dateMatch = desc.match(
      /Deposit request made on (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/
    );
    const date = dateMatch ? dateMatch[1] : "";

    // Extract any JSON data if available
    const jsonMatch = desc.match(/DATA - (\{.*?\}) -/);
    let jsonData = null;
    if (jsonMatch) {
      try {
        jsonData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        // Ignore parsing errors
      }
    }

    // Return the clean description or the original if parsing fails
    return desc.split(" - DATA -")[0] || desc;
  };
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Transaction Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Ref: {data?.reference_no}
          </p>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <IconStore.close className="size-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Amount Card */}
        <div className="mx-6 my-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Amount</span>
          </div>
          <div className="flex items-baseline">
            <h1 className="text-2xl font-bold text-indigo-800">
              {data?.price_with_currency}
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formatDateTime(data?.created_date_time)}
          </p>
        </div>

        {/* Transaction Details */}
        <div className="mx-6 mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-700">
              Transaction Information
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-gray-600">Reference Number</span>
              <span className="text-sm font-medium text-gray-800">
                {data?.reference_no}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium text-gray-800">
                {data?.amount}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-gray-600">Currency</span>
              <span className="text-sm font-medium text-gray-800">
                {data?.currency}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="text-sm font-medium text-gray-800">
                {data?.payment_transfer_by}
              </span>
            </div>
          </div>
        </div>

        {/* Notes and Description */}
        <div className="mx-6 mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-700">
              Additional Information
            </h3>
          </div>
          {data?.notes && (
            <div className="px-4 py-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                {data?.notes}
              </p>
            </div>
          )}
          {data?.description && (
            <div className="px-4 py-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                {formatDescription(data?.description)}
              </p>
            </div>
          )}
          {data?.approve_reject_reason && (
            <div className="px-4 py-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reason</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                {data?.approve_reject_reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;
