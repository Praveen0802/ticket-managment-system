import { IconStore } from "@/utils/helperFunctions/iconStore";

const TransactionTable = ({ transactions }) => {
  return (
    <div className="w-full bg-white border-[1px] border-[#E0E1EA]">
      <div className="grid grid-cols-12 bg-gray-100 py-2 px-4">
        <div className="col-span-1 text-sm font-medium text-[#343432]">
          Date
        </div>
        <div className="col-span-2 text-sm font-medium text-[#343432]">
          Type
        </div>
        <div className="col-span-2 text-sm font-medium text-[#343432]">In</div>
        <div className="col-span-2 text-sm font-medium text-[#343432]">Out</div>
        <div className="col-span-2 text-sm font-medium text-[#343432]">
          Payout reference
        </div>
        <div className="col-span-3 text-sm font-medium text-[#343432]">
          Description
        </div>
      </div>

      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="grid grid-cols-12 py-3 px-4 border-b border-[#E0E1EA]"
        >
          <div className="col-span-1 text-sm text-[#343432]">
            {transaction.date}
          </div>
          <div className="col-span-2 text-sm text-[#343432] flex items-center">
            {transaction.type === "credit" ? (
              <IconStore.circleTick className="stroke-green-500 size-4 mr-1" />
            ) : transaction.type === "Tx trade" ? (
              <IconStore.download className="stroke-[#130061] size-4 mr-1" />
            ) : transaction.type === "Transfer" ? (
              <IconStore.download className="stroke-[#130061] size-4 mr-1" />
            ) : transaction.type === "Virtual Card" ? (
              <IconStore.upload className="stroke-[#130061] size-4 mr-1" />
            ) : null}
            {transaction.type === "credit" ? "Credit" : transaction.type}
          </div>
          <div className="col-span-2 text-sm text-[#343432]">
            {transaction.type === "credit" ? `£${transaction.amount}` : "-"}
          </div>
          <div className="col-span-2 text-sm text-[#343432]">
            {transaction.type !== "credit" ? `£${transaction.amount}` : "-"}
          </div>
          <div className="col-span-2 text-sm text-[#343432]">
            {transaction.payoutReferance || "-"}
          </div>
          <div className="col-span-3 text-sm text-[#343432] flex justify-between items-center">
            <span>{transaction.description}</span>
            <div className="flex-shrink-0">
              <IconStore.eye className="stroke-[#130061] size-5 cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionTable;
