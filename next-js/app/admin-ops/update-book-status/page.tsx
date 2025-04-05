'use client';
import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
const UpdateBooksStatus: React.FC = () => {
    const authFetch = useFetch("/customer/verify-admin/", (res) => {
        return;
    });
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        authFetch.performFetch({
            method: "POST",
            headers: {
                "Authorization": Cookies.get("token")
                  ? `Token ${Cookies.get("token")}`
                  : "",
                "X-CSRFToken": Cookies.get("csrftoken") || "",
              },
        });
        return () => {
            authFetch.cancelFetch();
        };
    }, []);

    const [formData, setFormData] = useState({
        full_name: "",
      });
      const { isLoading, error, performFetch, cancelFetch } = useFetch("/book/update-books-status/", (res) => {
        setSuccess(true);
    });
    const submitForm = () => {
    
        performFetch({
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": Cookies.get("token")
              ? `Token ${Cookies.get("token")}`
              : "",
            "X-CSRFToken": Cookies.get("csrftoken") || "",
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
        const name = target.name;
        const value = target.value;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    return (
        <>
        <div className="gap"></div>
              {authFetch.isLoading ? (
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
                  wrapperClass=""
                  visible={true}
                />
              ) : authFetch.error ? (
                <p className="error">{authFetch.error?.message}</p>
              ) :(<>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="full_nameInput" className="form-label">
                    Type books env_no that you want to update
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookIdsInput"
                    name="ids"
                    value={formData.full_name}
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
                        Update Books
                    </button>
                )
                }
                </form>
                {error ? (
                    <p className="error">{error?.message}</p>
                ) : success ? (
                    <p style={{
                        color: "white",
                        backgroundColor: "green",
                        fontWeight: "bold",
                      }}>Books updated successfully</p>
                ): (
                    <p style={{
                        color: "white",
                        backgroundColor: "yellow",
                      }}>Please enter books env_no(s) by seperating with coma</p>
                )
                }
                </>
              )}
    </>
    )
}

export default UpdateBooksStatus;