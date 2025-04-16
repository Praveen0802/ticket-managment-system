import React, { useState } from "react";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import EventListView from "./eventListView";
import {
  desiredFormatDate,
  formatDate,
  formatDateTime,
} from "@/utils/helperFunctions";
import { fetchRecentlyViewedList } from "@/utils/apiHandler/request";
import { useRouter } from "next/router";

const TradeHome = (props) => {
  const { profile, response = {} } = props;
  const {
    hotEvents = {},
    lastMinuteEvents = [],
    recentlyViewedEvents,
  } = response;

  const constructViewDataType = (array) => {
    return array?.map((item) => {
      return {
        id: item?.m_id,
        name: item?.match_name,
        date: desiredFormatDate(item?.match_date),
        time: item?.match_time,
        listing: item?.listings,
        league: item?.tournament_name,
        availableTickets: item?.available_tickets,
        priceFrom: `${item?.price_type} ${item?.price_start_from}`,
      };
    });
  };
  // Sample data based on the image
  const sections = [
    {
      name: "Recently Viewed Events",
      icon: "eye",
      events: constructViewDataType(recentlyViewedEvents),
    },
    {
      name: "Hot Events",
      icon: "flame",
      events: constructViewDataType(hotEvents?.top_matchs),
    },
    {
      name: "Last-minute Events",
      icon: "clock",
      events: constructViewDataType(lastMinuteEvents),
    },
  ];

  // Generate initial state dynamically based on sections length
  // First section is expanded by default, others are collapsed
  const [expandedSections, setExpandedSections] = useState(() => {
    return sections.map((_, index) => index === 0);
  });

  const toggleSection = (index) => {
    setExpandedSections((currentExpandedSections) => {
      const newExpandedSections = [...currentExpandedSections];
      newExpandedSections[index] = !newExpandedSections[index];
      return newExpandedSections;
    });
  };

  const router = useRouter();


  const handleEventClick = async (event) => {
    console.log("Event clicked:", event);
    const { id } = event;
    await fetchRecentlyViewedList("", "POST", "", {
      m_id: id,
    });
    router.push(`/trade/inventory/${id}`);
  };

  return (
    <div className="w-full bg-gray-100 p-4 h-full">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div
            className={`flex items-center justify-between bg-[#130061] text-white px-4 py-[14px]  ${
              expandedSections[index] ? "rounded-t-[6px]" : "rounded-[6px]"
            } cursor-pointer`}
            onClick={() => toggleSection(index)}
          >
            <div className="flex gap-3 items-center">
              <IconStore.eye className="size-5" />
              <span className="text-[14px] font-medium">{section?.name}</span>
            </div>
            <div className="flex items-center bg-[#FFFFFF26] p-1 rounded-full">
              {expandedSections[index] ? (
                <IconStore.chevronUp className="size-4" />
              ) : (
                <IconStore.chevronDown className="size-4" />
              )}
            </div>
          </div>

          <div
            className={`bg-white rounded-b shadow overflow-hidden transition-max-height duration-300 ease-in-out ${
              expandedSections[index] ? "max-h-[400px]" : "max-h-0 opacity-0"
            }`}
          >
            <div className="overflow-y-auto max-h-[400px]">
              {section?.events?.map((event, eventIndex) => {
                return (
                  <EventListView
                    key={eventIndex}
                    event={event}
                    onClick={() => handleEventClick(event)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TradeHome;
