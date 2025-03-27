import ResetPasswordPage from "@/components/resetPage";
import React from "react";

const ResetPassword = (props) => {
  return <ResetPasswordPage {...props} />;
};

export default ResetPassword;

export const getServerSideProps = async (context) => {
  const { index: token = "" } = context.query;
  return {
    props: { token },
  };
};
