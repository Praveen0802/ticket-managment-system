import TradePage from "@/components/tradePage";
import { FetchAllCategories } from "@/utils/apiHandler/request";
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
  const allCategories = await FetchAllCategories(authToken);
  return {
    props: {
      profile,
      response: response || {},
      allCategories: allCategories || [],
    },
  };
}
