import dynamic from "next/dynamic";
import React from "react";

const CheckoutReturn = dynamic(
  () => import("../../../components/checkout/CheckoutReturn"),
  { ssr: false },
);
const CheckoutReturnPage: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <CheckoutReturn />
    </>
  );
};

export default CheckoutReturnPage;
