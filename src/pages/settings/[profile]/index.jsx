import SettingPage from "@/components/settingPage";
import React from "react";

const Settings = (props) => {
  return <SettingPage {...props} />;
};

export default Settings;

export async function getServerSideProps(ctx) {
  const { profile } = ctx?.query;
  return {
    props: { profile },
  };
}
