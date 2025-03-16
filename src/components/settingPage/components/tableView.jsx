import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const TableView = (props) => {
  const { headerClassName, rowClassName, currentUsers } = props;
  return (
    <div className="w-full border-[1px] max-h-[calc(100vh-400px)] overflow-auto border-[#eaeaf1] rounded-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className={headerClassName}>Name</th>
            <th className={headerClassName}>Email</th>
            <th className={headerClassName}>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index} className="">
              <td className={rowClassName}>{user.name}</td>
              <td className={rowClassName}>{user.email}</td>
              <td className={rowClassName}>
                <div className="flex justify-between  items-center">
                  {user.type}
                  <div className="flex  gap-2 items-center">
                    <button className="text-[#323A70] hover:text-[#130061]">
                      <IconStore.pencilEdit className='size-4 stroke-[#130061]'/>
                    </button>
                    {user?.type != "Primary User" && (
                      <button className="text-[#323A70] hover:text-red-600">
                        <IconStore.trash  className='size-4 stroke-red-600' />
                      </button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
