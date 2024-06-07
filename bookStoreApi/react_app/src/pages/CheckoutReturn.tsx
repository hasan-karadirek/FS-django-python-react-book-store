import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "../types/models";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultBookImage from "../assets/defaultBookImage.webp";

const CheckoutReturn: React.FC = () => {
  const navigate = useNavigate();
  const orderInProgress = JSON.parse(
    localStorage.getItem("orderInProgress"),
  )?.order;
  const [order, setOrder] = useState<Order | null>(
    orderInProgress ? orderInProgress : null,
  );
  const { error, isLoading, performFetch } = useFetch(
    `/store/order-status/${orderInProgress.id}/`,
    (res) => {
      setOrder(res.data as Order);
      if (order.status !== "PENDING") {
        setTimeout(() => {
          navigate(order.customer ? "/customer" : "/shop/books");
        }, 10000);
      }
    },
  );
  useEffect(() => {
    let intervalId;
    if (orderInProgress) {
      intervalId = setInterval(() => {
        performFetch({headers:{
          Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : ""
        }});
      }, 5000);
    }
    if (order?.status !== "PENDING") {
      clearInterval(intervalId);
    }
  }, []);

  const BASE_SERVER_URL=process.env.BASE_SERVER_URL
  return (
    <>
      <div className="gap"></div>
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
      ) : error ? (
        <p className="error">{error.message}</p>
      ) : (
        <div className="container d-flex mt-4" style={{}}>
          <ul className="p-3">
            <h4>Ordered Books</h4>
            {order?.order_details?.length > 0 ? (
              order.order_details.map((detail, index) => (
                <li key={index} className="d-flex p-3 nav-cart-list-item">
                  <img
                    className="nav-cart-list-image"
                    src={
                      detail.book.images.length > 0
                        ? `${BASE_SERVER_URL}${detail.book.images[0].image}`
                        : defaultBookImage
                    }
                    alt={detail.book.title}
                  />
                  <div className="nav-cart-list-body">
                    <h6 className="cart-item-title">
                      {`${detail.book.title} - ${detail.book.author} - ${detail.book.year} - ${detail.book.publishing_house}`}
                    </h6>
                    <div className="d-flex">
                      <p id="nav-cart-item-price">{detail.book.price}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No items in the cart</li>
            )}
          </ul>
          <div className="p-3">
            <h4 style={{ color: "black" }}>Order Address</h4>
            <p>{order?.address.full_name}</p>
            <p>
              {order?.address.street} - {order?.address.postcode}
            </p>
            <p>
              {order?.address.city} - {order?.address.country}
            </p>
            <p>Total: {order?.cost} </p>
            <p
              style={{
                backgroundColor:
                  order?.status === "OPEN"
                    ? "blue"
                    : order?.status === "PENDING"
                      ? "yellow"
                      : "red",
              }}
            >
              Status: {order?.status}{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutReturn;
