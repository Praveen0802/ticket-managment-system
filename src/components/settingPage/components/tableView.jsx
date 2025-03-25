import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const TableView = (props) => {
  const { headerClassName, rowClassName, currentUsers } = props;

  // For mobile view - card style display
  const renderMobileView = () => {
    return (
      <div className="flex flex-col gap-3 sm:hidden">
        {currentUsers.map((user, index) => (
          <div key={index} className="border rounded-md border-[#eaeaf1] p-3">
            <div className="flex justify-between items-center border-b border-[#eaeaf1] pb-2 mb-2">
              <span className="font-medium text-sm">
                {user.first_name} {user.last_name}
              </span>
              <div className="flex gap-2 items-center">
                <button className="text-[#323A70] hover:text-[#130061]">
                  <IconStore.pencilEdit className="size-4 stroke-[#130061]" />
                </button>
                <button className="text-[#323A70] hover:text-red-600">
                  <IconStore.trash className="size-4 stroke-red-600" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="text-right">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span>
                  +{user.phone_code} {user.mobile_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Country:</span>
                <span>{user.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // For tablet and desktop view - table style display
  const renderTableView = () => {
    return (
      <div className="w-full border-[1px] hidden sm:block max-h-[calc(100vh-400px)] overflow-auto border-[#eaeaf1] rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className={headerClassName}>Name</th>
              <th className={headerClassName}>Email</th>
              <th className={headerClassName}>Phone</th>
              <th className={headerClassName}>Country</th>
              <th className={headerClassName}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td className={rowClassName}>
                  {user.first_name} {user.last_name}
                </td>
                <td className={rowClassName}>{user.email}</td>
                <td className={rowClassName}>
                  +{user.phone_code} {user.mobile_number}
                </td>
                <td className={rowClassName}>{user.country}</td>
                <td className={rowClassName}>
                  <div className="flex gap-2 items-center">
                    <button className="text-[#323A70] hover:text-[#130061]">
                      <IconStore.pencilEdit className="size-4 stroke-[#130061]" />
                    </button>
                    <button className="text-[#323A70] hover:text-red-600">
                      <IconStore.trash className="size-4 stroke-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {renderMobileView()}
      {renderTableView()}
    </>
  );
};

export default TableView;
