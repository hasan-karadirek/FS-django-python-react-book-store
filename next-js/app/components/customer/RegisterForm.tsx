"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { RegisterResponse } from "../../types/responses";
import { RegisterFormData } from "../../types/forms";
import { Circles } from "react-loader-spinner";
import { getLocalStorage, setLocalStorage } from "@/app/utils/LocalStorage";

const RegisterForm: React.FC = () => {
  useEffect(() => {
    if (getLocalStorage("customer") && Cookies.get("token")) {
      window.location.href = "/shop/books/";
    }
  }, []);
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/register/",
    (res) => {
      const data = res.data as RegisterResponse;
      Cookies.set("token", data.token);
      setLocalStorage("customer", JSON.stringify(data.customer));
      if (data.order) {
        setLocalStorage("order", JSON.stringify(data.order));
      }
      const lastPathSegment =
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ];
      if (lastPathSegment === "register") {
        window.location.href = "/shop/books/";
      } else {
        window.location.reload();
      }
    },
  );
  const submitForm = () => {
    const registerData = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      username: formData.email,
    };
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData),
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setFormError(
        "Passwords do not match. Please fill your passwords correctly.",
      ); // show error passwords dont match
    } else {
      submitForm();
    }
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
      <div className="container register-container">
        <form onSubmit={handleSubmit}>
          <h3>Register:</h3>
          <div className="mb-3">
            <label htmlFor="first_nameInput" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first_nameInput"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_nameInput" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_nameInput"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
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
          <div className="mb-3">
            <label htmlFor="passwordConfirmInput" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmInput"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
            {formError ? <p className="error">{formError}</p> : ""}
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
              Register
            </button>
          )}
          {error ? <p className="error">{error.message}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
