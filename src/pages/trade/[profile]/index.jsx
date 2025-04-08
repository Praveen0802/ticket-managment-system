import TradePage from "@/components/tradePage";
import React from "react";

const Trade = (props) => {
  return <TradePage {...props} />;
};

export default Trade;

export async function getServerSideProps(context) {
  const { profile } = context?.query;
  return {
    props: { profile },
  };
}
