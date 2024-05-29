import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { OrderContext } from "../../contexts/OrderContext";
import Cookies from "js-cookie";
import { CheckoutResponse } from "../../types/responses";
import { CheckoutFormData } from "../../types/forms";
import { Order } from "../../types/models";
import { ErrorContext } from "../../contexts/ErrorContext";

const AddressForm: React.FC = () => {
  const { setOrder } = useContext(OrderContext);
  const { setCustomError } = useContext(ErrorContext);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/store/checkout/",
    (res) => {
      const data = res.data as CheckoutResponse;
      localStorage.removeItem("order");
      localStorage.setItem("orderInProgress", JSON.stringify(res.data));
      setOrder(data.order);
      window.location.href = data.redirectUrl;
    },
  );
  useEffect(() => {
    if (error?.name === "expired_token" || error?.name === "invalid_token") {
      Cookies.remove("token");
      Cookies.remove("session_id");
      localStorage.clear();
      location.reload();
    }
    if (error?.name === "book-availability") {
      localStorage.setItem("order", JSON.stringify(error.data));
      setOrder(error.data as Order);
      setCustomError(error);
    }
  }, [error]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    full_name: "",
    email: "",
    street: "",
    house_no: "",
    postcode: "",
    city: "",
    country: "",
  });
  const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
  const csrfToken = Cookies.get("csrftoken")
  const submitForm = () => {
    const addressForm = {
      redirectUrl: `${BASE_SERVER_URL}/shop/checkout-return`,
      address: formData,
    };

    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : "",
          "X-CSRFToken":csrfToken
      },
      body: JSON.stringify(addressForm),
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Cookies.get("session_id")) {
      Cookies.set("session_id", Date.now().toString());
    }
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
    <div className="checkout-address-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="full_nameInput" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="full_nameInput"
            name="full_name"
            value={formData.full_name}
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
          <label htmlFor="streetTextarea" className="form-label">
            Street
          </label>
          <textarea
            className="form-control"
            id="streetTextarea"
            name="street"
            value={formData.street}
            onChange={handleChange}
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="house_nooInput" className="form-label">
            House No
          </label>
          <input
            type="text"
            className="form-control"
            id="house_noInput"
            name="house_no"
            value={formData.house_no}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postcodeInput" className="form-label">
            Postcode
          </label>
          <input
            type="text"
            className="form-control"
            id="postcodeInput"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cityInput" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="cityInput"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="countryInput" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="countryInput"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        {isLoading ? (
          ""
        ) : (
          <button type="submit" className="btn btn-success checkout-submit-btn">
            Checkout
          </button>
        )}
        {error ? <p className="error">{error.message}</p> : ""}
      </form>
    </div>
  );
};

export default AddressForm;
