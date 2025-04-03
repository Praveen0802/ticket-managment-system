import TradePage from "@/components/tradePage";
import React from "react";

const Trade = (props) => {
  return <TradePage {...props} />;
};

export default Trade;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
