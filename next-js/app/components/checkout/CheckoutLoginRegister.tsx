"use client";
import { useState } from "react";
import LoginForm from "../customer/LoginForm";
import RegisterForm from "../customer/RegisterForm";
import Cookies from "js-cookie";
import { getLocalStorage } from "@/app/utils/LocalStorage";

const CheckoutLoginRegister = () => {
 
  const [isLoginForm, setIsLoginForm] = useState<boolean | null>(true);
  return (
    <div className="checkout-auth-forms">
      {Cookies.get("token") && getLocalStorage("customer") ? (
        ""
      ) : isLoginForm ? (
        <>
          <LoginForm
            containerClasses="checkout-login"
            setIsLoginForm={setIsLoginForm}
          />
          <p style={{ textAlign: "center" }}>Or continue as guest customer.</p>
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
  );
};
export default CheckoutLoginRegister;
