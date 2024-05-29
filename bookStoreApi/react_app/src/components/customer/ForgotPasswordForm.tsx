import React, { ChangeEvent, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/forgotpassword/",
    (res) => {
      if (res) {
        navigate("/customer/login");
      }
    },
  );
const csrfToken = Cookies.get("csrftoken")
  const submitForm = () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken":csrfToken
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
      <div className="mx-auto" style={{ marginTop: "1.5rem" }}>
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
              Forgot Password
            </button>
          )}
          {error ? <p className="error">{error.message}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
