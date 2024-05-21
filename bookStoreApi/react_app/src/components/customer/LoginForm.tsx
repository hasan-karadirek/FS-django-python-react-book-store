import React, { ChangeEvent, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import "../CSS/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginFormData } from "../../types/forms";
import { LoginResponse } from "../../types/responses";

interface LoginFormProps {
  containerClasses: string;
}
const LoginForm: React.FC<LoginFormProps> = ({ containerClasses }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const loc = useLocation();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/login/",
    (res) => {
      const data = res.data as LoginResponse;
      Cookies.set("token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.customer));
      data.order
        ? localStorage.setItem("order", JSON.stringify(data.order))
        : "";

      loc.pathname.split("/")[loc.pathname.split("/").length - 1] === "login"
        ? navigate("/shop/books/")
        : location.reload();
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
      <div className={containerClasses}>
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

export default LoginForm;
