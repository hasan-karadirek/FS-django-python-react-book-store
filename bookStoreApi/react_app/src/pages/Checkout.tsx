import React, { useState } from "react";
import AddressForm from "../components/checkout/AddressForm";
import CheckoutCart from "../components/checkout/CheckoutCart";
import "../components/CSS/Checkout.css";
import RegisterForm from "../components/customer/RegisterForm";
import LoginForm from "../components/customer/LoginForm";
import Cookies from "js-cookie";

const Checkout: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  return (
    <>
      <div className="gap"></div>
      <div className="checkout-auth-forms">
        {Cookies.get("token") && localStorage.getItem("customer") ? (
          ""
        ) : isLoginForm ? (
          <>
            <LoginForm
              containerClasses="checkout-login"
              setIsLoginForm={setIsLoginForm}
            />
            <p style={{ textAlign: "center" }}>
              Or continue as guest customer.
            </p>
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
