import React from "react";
import "../components/CSS/Login.css";
import LoginForm from "../components/LoginForm";

export interface Customer {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

const Login: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <LoginForm containerClasses="container login-form" />
    </>
  );
};

export default Login;
