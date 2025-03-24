import React from "react";

const LatestBookingTable = ({ bookings }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date, time) => {
    return `${formatDate(date)} ${time}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
          <div className="flex flex-col gap-5">
            <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
              Booking History
            </p>

            <div className="overflow-auto max-h-[350px]">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-gray-400">
                    <th className="p-3 text-left text-sm font-medium">Match</th>
                    <th className="p-3 text-left text-sm font-medium">
                      Date & Time
                    </th>
                    <th className="p-3 text-left text-sm font-medium">Venue</th>
                    <th className="p-3 text-left text-sm font-medium">Qty</th>
                    <th className="p-3 text-left text-sm font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking?.booking_id}
                      className="border-t border-[#eaeaf1] hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm text-gray-700">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {booking?.match_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {booking?.tournament_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {formatDateTime(
                          booking?.match_date,
                          booking?.match_time
                        )}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        <div className="flex flex-col">
                          <span>{booking?.stadium_name}</span>
                          <span className="text-xs text-gray-500">
                            {booking?.city_name}, {booking?.country_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 text-center">
                        {booking?.quantity}
                      </td>
                      <td className="p-3 text-sm font-medium">
                        {booking?.price_with_currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBookingTable;
