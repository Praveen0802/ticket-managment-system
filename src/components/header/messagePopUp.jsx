import React from "react";
import { X } from "lucide-react";
import { IconStore } from "@/utils/helperFunctions/iconStore";

const MessagePopUp = ({ popUpData, onClose }) => {
  const { title, sub_title, contact, email, content } = popUpData || {};

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <IconStore.close className="size-4" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-medium text-blue-600 mb-2">{title}</h2>
        <p className="text-gray-600">{sub_title}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="">{contact}</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="">{email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default MessagePopUp;
