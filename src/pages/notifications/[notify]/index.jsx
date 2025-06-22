import NotificationPage from "@/components/notifications";
import SettingPage from "@/components/settingPage";
import {
  checkValidAuthToken,
  getAuthToken,
  nextRedirect,
} from "@/utils/helperFunctions";
import { fetchSettingsPageDetails } from "@/utils/serverSideRequests";
import React from "react";

const Notification = (props) => {
  return <NotificationPage {...props} />;
};

export default Notification;

export async function getServerSideProps(ctx) {
  const { notify } = ctx?.query;
  //   const validToken = checkValidAuthToken(ctx);
  //   const authToken = getAuthToken(ctx);
  //   if (!validToken) {
  //     return nextRedirect("login");
  //   }
  //   const response = await fetchSettingsPageDetails(profile, authToken, ctx);
  return {
    props: { notify },
  };
}
