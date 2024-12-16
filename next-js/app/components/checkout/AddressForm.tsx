"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { OrderContext } from "../../contexts/OrderContext";
import Cookies from "js-cookie";
import { CheckoutResponse } from "../../types/responses";
import { CheckoutFormData } from "../../types/forms";
import { Order } from "../../types/models";
import { ErrorContext } from "../../contexts/ErrorContext";
import Link from "next/link";
import { clearLocalStorage, removeLocalStorage, setLocalStorage } from "@/app/utils/LocalStorage";

const AddressForm: React.FC = () => {
  const context = useContext(OrderContext);
  const order = context?.order || {order_details: []}
  const setOrder = context?.setOrder || (function(){});
  // const { order, setOrder } = context ? context : {order: {order_details: []},setOrder: ()=>{}};
  
  const errorContext = useContext(ErrorContext);
  const setCustomError = errorContext?.setCustomError || function(){};
  
  const [legalError, setLegalError] = useState<string | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/store/checkout/",
    (res) => {
      const data = res.data as CheckoutResponse;
      removeLocalStorage("order");
      setLocalStorage("orderInProgress", JSON.stringify(res.data));
      setOrder(data.order);
      window.location.href = data.redirectUrl;
    },
  );
  useEffect(() => {
    if (error?.name === "expired_token" || error?.name === "invalid_token") {
      Cookies.remove("token");
      Cookies.remove("session_id");
      clearLocalStorage();
      setCustomError(error);
      location.reload();
    }
    if (error?.name === "unavailable_books") {
      setLocalStorage("order", JSON.stringify(error.data));
      setOrder(error.data as Order);
      setCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    full_name: "",
    email: "",
    street: "",
    house_no: "",
    postcode: "",
    city: "",
    country: "",
    privacy: false,
    sale: false,
  });
  const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
  const submitForm = () => {
    const addressForm = {
      redirectUrl: `${BASE_SERVER_URL}/shop/checkout/return`,
      address: formData,
    };

    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : ""
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
    if (formData.privacy === false || formData.sale === false) {
      setLegalError(
        "Please confirm that you have read privacy policy and sales agreement to continue checkout.",
      );
      return;
    }
    submitForm();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const name = target.name;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
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
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="privacyCheckbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="privacyCheckbox">
              I read {<Link href="/privacy-policy">Privacy Policy</Link>}
            </label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="saleCheckbox"
              name="sale"
              checked={formData.sale}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="saleCheckbox">
              I read {<Link href="/sales-agreement">Sales Agreement</Link>}
            </label>
          </div>
          <p className="error">{legalError}</p>
        </div>

        {order?.order_details.length > 0 ? (
          isLoading ? (
            ""
          ) : (
            <button
              type="submit"
              className="btn btn-success checkout-submit-btn"
            >
              Checkout
            </button>
          )
        ) : (
          ""
        )}
        {error ? <p className="error">{error.message}</p> : ""}
      </form>
    </div>
  );
};

export default AddressForm;
