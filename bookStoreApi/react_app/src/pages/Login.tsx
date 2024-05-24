import React from "react";
import "../components/CSS/Login.css";
import LoginForm from "../components/customer/LoginForm";

const Login: React.FC = () => {
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
