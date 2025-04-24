import Button from "@/components/commonComponents/button";
import { isEmptyObject } from "@/utils/helperFunctions";
import React, { useState } from "react";
import { Download } from "lucide-react";

const DownloadYourTickets = ({ tickets }) => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("etickets");

  // Define available tabs based on data
  const availableTabs = [];
  if (tickets?.etickets?.length > 0)
    availableTabs.push({ id: "etickets", label: "E-Tickets" });
  if (tickets?.links?.length > 0)
    availableTabs.push({ id: "links", label: "Links" });
  if (!isEmptyObject(tickets?.pod))
    availableTabs.push({ id: "pods", label: "Pods" });

  // Set default active tab if current one isn't available
  React.useEffect(() => {
    if (
      availableTabs.length > 0 &&
      !availableTabs.find((tab) => tab.id === activeTab)
    ) {
      setActiveTab(availableTabs[0].id);
    }
  }, [tickets, activeTab]);


  const fetchDownloadLinks = async(type,id)=>{
const generateUrl = `/bookings/`
  }



  return (
    <div className="border-[1px] border-[#E0E1EA] h-full rounded-md">
      <div className="border-b-[1px] border-[#E0E1EA] px-[16px] py-[12px] flex justify-between items-center">
        <p className="text-[16px] font-semibold text-[#323A70] ">
          Download Your Tickets
        </p>
        <Button
          type="primary"
          label="Download All"
          classNames={{
            root: "px-3 py-[5px] w-full transition-colors w-fit",
            label_:
              "text-sm font-medium flex items-center justify-center gap-2",
          }}
          icon={<Download size={16} />}
        />
      </div>
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 cursor-pointer font-medium transition-colors ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white">
        {/* E-Tickets Content */}
        {activeTab === "etickets" && tickets?.etickets?.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">E-Tickets</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {tickets.etickets.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 pl-[20px]">
              {tickets?.etickets?.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 ">
                  <div>
                    <p className="font-medium text-gray-700">
                      Ticket #{index + 1}
                    </p>
                  </div>
                  <Button
                    type="primary"
                    label="Download"
                    classNames={{
                      root: "px-4 py-2 w-full transition-colors w-fit",
                      label_:
                        "text-sm font-medium flex items-center justify-center gap-2",
                    }}
                    icon={<Download size={16} />}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Content */}
        {activeTab === "links" && tickets?.links?.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Links</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {tickets.links.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-[20px]">
              {tickets?.links?.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 ">
                  <div>
                    <p className="font-medium text-gray-700">
                      Link #{index + 1}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-sm  cursor-pointer hover:underline font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    <Download size={16} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pods Content */}
        {activeTab === "pods" && !isEmptyObject(tickets?.pod) && (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Pods</h2>
            </div>
            <div className="p-4">
              <Button
                type="primary"
                label="Download Pods"
                classNames={{
                  root: "px-4 py-2 w-fit ",
                  label_: "text-sm font-medium flex items-center gap-2",
                }}
                icon={<Download size={16} />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadYourTickets;
