import SalesPage from "@/components/sales";

import React from "react";

const Notification = (props) => {
  return <SalesPage {...props} />;
};

export default Notification;

export async function getServerSideProps(ctx) {
  const { profile } = ctx?.query;
  //   const validToken = checkValidAuthToken(ctx);
  //   const authToken = getAuthToken(ctx);
  //   if (!validToken) {
  //     return nextRedirect("login");
  //   }
  //   const response = await fetchSettingsPageDetails(profile, authToken, ctx);
  return {
    props: { profile },
  };
}
