import TradePage from "@/components/tradePage";
import { getAuthToken } from "@/utils/helperFunctions";
import { fetchTradePageData } from "@/utils/serverSideRequests";
import React from "react";

const Trade = (props) => {
  return <TradePage {...props} />;
};

export default Trade;

export async function getServerSideProps(context) {
  const { profile } = context?.query;
  const authToken = getAuthToken(context);
  const response = await fetchTradePageData(profile, authToken);
  console.log(response, "responseresponse");
  return {
    props: { profile, response: response || {} },
  };
}
