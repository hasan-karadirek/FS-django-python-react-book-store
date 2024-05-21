import React, { useState } from "react";
import AddressForm from "../components/checkout/AddressForm";
import CheckoutCart from "../components/checkout/CheckoutCart";
import "../components/CSS/Checkout.css";
import RegisterForm from "../components/customer/RegisterForm";
import LoginForm from "../components/customer/LoginForm";

const Checkout: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <>
      <div className="gap"></div>
      <div className="checkout-auth-forms">
        {isLoginForm ? (
          <>
            <LoginForm containerClasses="checkout-login" />
            <div id="checkout-create-account">
              No Account? :{" "}
              <a href="#" onClick={() => setIsLoginForm(false)}>
                Create Account
              </a>
            </div>
          </>
        ) : (
          <div className="checkout-register-container">
            <span id="register-close" onClick={() => setIsLoginForm(true)}>
              x
            </span>
            <RegisterForm />
          </div>
        )}
      </div>
      <div className="d-flex container checkout-container">
        <CheckoutCart />
        <AddressForm />
      </div>
    </>
  );
};

export default Checkout;
