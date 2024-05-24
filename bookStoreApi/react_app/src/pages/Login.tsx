import React, { useEffect } from "react";
import "../components/CSS/Login.css";
import LoginForm from "../components/customer/LoginForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("customer") && Cookies.get("token")) {
      navigate("/shop/books/");
    }
  }, []);
  return (
    <>
      <div className="gap"></div>
      <LoginForm
        containerClasses="container login-form"
        setIsLoginForm={null}
      />
    </>
  );
};

export default Login;
