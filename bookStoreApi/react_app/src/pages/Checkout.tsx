import React, { useContext, useState } from "react";
import AddressForm from "../components/checkout/AddressForm";
import CheckoutCart from "../components/checkout/CheckoutCart";
import "../components/CSS/Checkout.css";
import RegisterForm from "../components/customer/RegisterForm";
import LoginForm from "../components/customer/LoginForm";
import Cookies from "js-cookie";
import { OrderContext } from "../contexts/OrderContext";

const Checkout: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const { order } = useContext(OrderContext);

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
      {order?.order_details.length > 0 ? (
        <>
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
      ) : (
        <div className="container">Your cart is empty.</div>
      )}
    </>
  );
};

export default Checkout;
