import React, { useEffect } from "react";
import RegisterForm from "../components/customer/RegisterForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
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
            Register
          </li>
        </ol>
      </nav>
      <RegisterForm />
    </>
  );
};

export default Register;
