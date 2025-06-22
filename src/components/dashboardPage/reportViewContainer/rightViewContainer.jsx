import React from "react";

const RightViewContainer = (props) => {
  const { tableView } = props;
  return (
    <div className="border-[1px] w-full md:w-[50%] border-[#eaeaf1] rounded-md overflow-x-auto">
      <table className="w-full min-w-[300px]">
        <thead>
          <tr>
            {tableView?.head.map((head, headIndex) => (
              <th
                className="border-b-[1px] text-[12px] text-[#7D82A4] font-normal border-[#eaeaf1] p-2"
                key={headIndex}
              >
                <p className="text-[#343432] text-[12px]">{head}</p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableView?.body.map((body, bodyIndex) => {
            return (
              <tr className="border-b-[1px] border-[#eaeaf1]" key={bodyIndex}>
                {body?.map((item, itemIndex) => {
                  return (
                    <td className="p-2" key={itemIndex}>
                      <p className="text-[#343432] text-[12px]">{item}</p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RightViewContainer;
