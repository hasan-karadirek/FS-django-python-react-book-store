import React, { ChangeEvent, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "./AddToCartButton";
import { OrderContext } from "../contexts/OrderContext";
interface CheckoutFormData {
  full_name: string;
  email: string;
  street: string;
  house_no: string;
  postcode: string;
  city: string;
  country: string;
}
interface CheckoutResponse {
  order: Order;
  redirectUrl: string;
}
const AddressForm: React.FC = () => {
  const { setOrder } = useContext(OrderContext);

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

  const [formData, setFormData] = useState<CheckoutFormData>({
    full_name: "",
    email: "",
    street: "",
    house_no: "",
    postcode: "",
    city: "",
    country: "",
  });

  const submitForm = () => {
    const addressForm = {
      redirectUrl: "http://localhost:8000/shop",
      address: formData,
    };

    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token e434cdd2e5150d848a0477e83f61f3f501cb428f",
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
        <button type="submit" className="btn btn-primary checkout-submit-btn">
          Submit
        </button>
        {error ? <p>error.message</p> : ""}
      </form>
    </div>
  );
};

export default AddressForm;
