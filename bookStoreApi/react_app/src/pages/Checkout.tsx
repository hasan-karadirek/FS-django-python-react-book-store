import React from "react";
import AddressForm from "../components/AddressForm";
import CheckoutCart from "../components/CheckoutCart";
import "../components/CSS/Checkout.css";

const Checkout: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <div className="d-flex container checkout-container">
        <CheckoutCart />
        <AddressForm />
      </div>
    </>
  );
};

export default Checkout;
