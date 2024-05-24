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
      <RegisterForm />
    </>
  );
};

export default Register;
