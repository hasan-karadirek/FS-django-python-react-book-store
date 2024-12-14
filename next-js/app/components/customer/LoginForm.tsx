"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import Link from "next/link";

import { LoginFormData } from "../../types/forms";
import { LoginResponse } from "../../types/responses";
import { Circles } from "react-loader-spinner";

interface LoginFormProps {
  containerClasses: string;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean | null>>;
}
const LoginForm: React.FC<LoginFormProps> = ({
  containerClasses,
  setIsLoginForm,
}) => {
  useEffect(() => {
    if (localStorage.getItem("customer") && Cookies.get("token")) {
      window.location.href = "/shop/books/";
    }
  }, []);

  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/login/",
    (res) => {
      const data = res.data as LoginResponse;
      Cookies.set("token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.customer));
      if (data.order) {
        localStorage.setItem("order", JSON.stringify(data.order));
      }

      const lastPathSegment =
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ];
      if (lastPathSegment === "login") {
        window.location.href = "/shop/books/";
      } else {
        window.location.reload();
      }
    },
  );
  const csrfToken = Cookies.get("csrftoken");
  const submitForm = () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
        <h3>Login:</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="full_nameInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          {isLoading ? (
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <button type="submit" className="btn btn-success">
              Login
            </button>
          )}
          {setIsLoginForm ? (
            <>
              <div style={{ textAlign: "center" }}>
                Forget Password? :{" "}
                <Link href="/customer/forgotpassword">Reset Your Password</Link>
              </div>
              <div id="checkout-create-account">
                No Account? :{" "}
                <a href="#" onClick={() => setIsLoginForm(false)}>
                  Create Account
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                Forget Password? :{" "}
                <Link href="/customer/forgotpassword">Reset Your Password</Link>
              </div>
              <div>
                No Account? :{" "}
                <Link href="/customer/register">Create Account</Link>
              </div>
            </>
          )}
          {error ? <p className="error">{error.message}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
