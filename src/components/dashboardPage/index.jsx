import LatestBookingTable from "./latestBookingTable";
import LatestOrderView from "./latestOrderView";
import OrderList from "./orderList";
import Subheader from "./subheader";
import pendingOrder from "../../../public/pendingOrders.svg";
import completedOrder from "../../../public/completedOrders.svg";
import pendingTickets from "../../../public/pendingTickets.svg";
import Image from "next/image";

const DashboardPage = (props) => {
  const { apiData } = props;
  const { dashboardData, orderHistory, transactionHistory } = apiData;
  return (
    <div className="flex flex-col h-full">
      <Subheader />
      <div className="overflow-auto p-4 md:p-6 w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wallet Section */}
          <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Wallet
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dashboardData?.wallet?.map((wallet, index) => (
                  <OrderList
                    key={index}
                    title="Balance"
                    desc={
                      <div className="flex gap-1 items-center">
                        {/* <p className="text-[#0137D5] bg-[#F2F5FD] font-normal p-[8px] rounded-[4px] text-xs md:text-sm">
                          {wallet?.icon}
                        </p> */}
                        <p className="text-[#323A70] text-sm md:text-base font-normal whitespace-nowrap">
                          {wallet?.price_with_currency}
                        </p>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Orders
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(dashboardData?.orders || {})?.map(
                  ([key, value], index) => {
                    const title =
                      key === "completedOrders"
                        ? "Completed Orders"
                        : key === "pendingOrders"
                        ? "Pending Orders"
                        : "Pending Tickets";
                    return (
                      <OrderList
                        key={index}
                        title={title}
                        desc={
                          <div className="flex gap-2 items-center">
                            <div className="text-[#0137D5] bg-[#F2F5FD] font-normal p-[8px] rounded-[4px] text-xs md:text-sm">
                              <Image
                                src={
                                  key === "completedOrders"
                                    ? completedOrder
                                    : key === "pendingOrders"
                                    ? pendingOrder
                                    : pendingTickets
                                }
                                width={18}
                                height={18}
                                alt="logo"
                              />
                            </div>
                            <p className="text-[#323A70] text-sm md:text-base font-normal">
                              {value}
                            </p>
                          </div>
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Latest Order View */}
          <LatestOrderView
            listItems={transactionHistory?.transaction_history}
            meta={transactionHistory?.meta}
          />

          {/* Latest Booking Table */}
          <LatestBookingTable
            listValues={orderHistory?.order_history}
            meta={orderHistory?.meta}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
