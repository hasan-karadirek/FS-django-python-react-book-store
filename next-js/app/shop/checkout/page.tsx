import React from "react";
import dynamic from "next/dynamic";

const CheckoutCart = dynamic(
  () => import("../../components/checkout/CheckoutCart"),
  { ssr: false },
);
const AddressForm = dynamic(
  () => import("../../components/checkout/AddressForm"),
  { ssr: false },
);
const CheckoutLoginRegister = dynamic(
  () => import("../../components/checkout/CheckoutLoginRegister"),
  { ssr: false },
);
const Checkout: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <nav className=" mt-3  fs-4 px-5" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop/books">Shop</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Checkout
          </li>
        </ol>
      </nav>
      (
      <>
        <CheckoutLoginRegister />
        <div className="d-flex container checkout-container">
          <CheckoutCart />
          <AddressForm />
        </div>
      </>
      )
    </>
  );
};

export default Checkout;
