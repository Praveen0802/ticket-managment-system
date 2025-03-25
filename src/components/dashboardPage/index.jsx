import LatestBookingTable from "./latestBookingTable";
import LatestOrderView from "./latestOrderView";
import OrderList from "./orderList";
import Subheader from "./subheader";

const DashboardPage = (props) => {
  const { apiData } = props;
  const { dashboardData, orderHistory, transactionHistory } = apiData;
  return (
    <div className="flex flex-col h-full">
      <Subheader />
      <div className="overflow-auto p-4 md:p-6 w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                {"Wallet"}
              </p>
              <div className="grid grid-cols-4 gap-4">
                {dashboardData?.wallet?.map((wallet, index) => {
                  return (
                    <OrderList
                      key={index}
                      title={"Balance"}
                      desc={wallet?.price_with_currency}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
            <div className="flex flex-col gap-5">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                {"Orders"}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(dashboardData?.orders)?.map(
                  ([key, value], index) => {
                    const title =
                      key == "completedOrders"
                        ? "Completed Orders"
                        : key == "pendingOrders"
                        ? "Pending Orders"
                        : "Pending Tickets";
                    return <OrderList key={index} title={title} desc={value} />;
                  }
                )}
              </div>
            </div>
          </div>
          <LatestOrderView
            listItems={transactionHistory?.transaction_history}
          />
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
