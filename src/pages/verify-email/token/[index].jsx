import ConfirmEmailPage from "@/components/confirmEmail";
import React from "react";

const ConfirmEmail = (props) => {
  return <ConfirmEmailPage {...props} />;
};

export default ConfirmEmail;

export const getServerSideProps = async (context) => {
  const { index: token = "" } = context.query;
  return {
    props: { token },
  };
};
