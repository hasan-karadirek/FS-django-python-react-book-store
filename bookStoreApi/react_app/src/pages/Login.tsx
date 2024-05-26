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
      <nav className=" mt-3  fs-4 px-5" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/customer">Customer</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Login
          </li>
        </ol>
      </nav>
      <LoginForm
        containerClasses="container login-form"
        setIsLoginForm={null}
      />
    </>
  );
};

export default Login;
