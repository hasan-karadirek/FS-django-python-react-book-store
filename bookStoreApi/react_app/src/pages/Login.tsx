import React, { ChangeEvent, useState } from "react";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
import "../components/CSS/Login.css";
import { useNavigate } from "react-router-dom";
interface LoginFormData {
  email: string;
  password: string;
}
interface Customer {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}
interface LoginResponse {
  token: string;
  customer: Customer;
}
const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/login/",
    (res) => {
      const data = res.data as LoginResponse;
      Cookies.set("token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.customer));
      navigate("/shop/books/");
    },
  );

  const submitForm = () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="gap"></div>
      <div className="container login-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Full Name
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="full_nameInput" className="form-label">
              Full Name
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {error ? error.message : ""}
        </form>
      </div>
    </>
  );
};

export default Login;
