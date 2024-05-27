import React, { ChangeEvent, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/customer/resetpassword/?token=${token}`,
    (res) => {
      if (res) {
        navigate("/customer/login");
      }
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
      <div className="mx-auto" style={{ marginTop: "1.5rem" }}>
        <h3>Reset Your Password</h3>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="confirmPasswordInput" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              Reset Password
            </button>
          )}
          {error ? <p className="error">{error.message}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
