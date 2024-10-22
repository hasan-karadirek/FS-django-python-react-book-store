import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Customer, Order } from "../types/models";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import "../components/CSS/Customer.css";
import { Circles } from "react-loader-spinner";

interface CustomerDashboardResponse {
  orders: Order[];
  customer: Customer;
}

const CustomerPage: React.FC = () => {
  const { width } = useWindowSize();

  const [dashboardInfo, setDashboardInfo] =
    useState<CustomerDashboardResponse | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { isLoading, error, performFetch } = useFetch(
    "/customer/dashboard/",
    (res) => {
      const dashboardResponse = res.data as CustomerDashboardResponse;
      setDashboardInfo(dashboardResponse);
      setActiveOrder(dashboardResponse.orders[0]);
    },
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token") || !localStorage.getItem("customer")) {
      navigate("/customer/login");
    }
    performFetch({
      headers: {
        Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : "",
      },
    });
  }, []);
  useEffect(() => {
    if (error?.name === "expired_token" || error?.name === "invalid_token") {
      Cookies.remove("token");
      localStorage.clear();
      navigate("/customer/login");
    }
  }, [error]);
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
        <>
          <div
            className="container"
            style={{ fontSize: "1.25rem", marginTop: "1rem" }}
          >{`Dear ${JSON.parse(localStorage.getItem("customer"))?.first_name},`}</div>
          <div className="accordion container my-5" id="accordion-orders">
            <h3>Your Previous Orders:</h3>
            {dashboardInfo?.orders.map((order) => (
              <div
                key={order.id}
                className={"accordion-item"}
                onClick={() => {
                  setActiveOrder(activeOrder?.id === order.id ? null : order);
                }}
                style={{ cursor: "pointer" }}
              >
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${activeOrder?.id === order.id ? "" : "collapsed"}`}
                    type="button"
                  >
                    {`Order = ${order.id} - ${order.address.full_name} - ${order.cost} - ${order.status}`}
                  </button>
                </h2>
                <div
                  id={`collapse-${order.id}`}
                  className={`accordion-collapse collapse ${activeOrder?.id === order.id ? "show" : ""}`}
                  data-bs-parent="#accordion-orders"
                >
                  <div
                    className={`accordion-body customer-order-accordion ${width > 481 ? "d-flex flex-wrap" : "block"}`}
                    style={{ justifyContent: "space-between" }}
                  >
                    <ul>
                      <h5>Books:</h5>
                      {order.order_details.map((detail, index) => (
                        <li key={index}>
                          <Link
                            to={`/shop/books/${detail.book.slug}`}
                          >{`${detail.book.title} - ${detail.book.author} - ${detail.book.year}`}</Link>
                          {` - ${detail.book.price}$`}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <h5>Address Info</h5>
                      <p>{order.address.full_name}</p>
                      <p>{order.address.email}</p>
                      <p>{order.address.street}</p>
                      <p>{order.address.postcode}</p>
                      <p>{`${order.address.city} / ${order.address.country}`}</p>
                    </div>
                    <div style={{ marginRight: "1rem" }}>
                      <h5>Order Info</h5>
                      <p>Order Id: {order.id}</p>
                      <p>Total Cost: {order.cost}</p>
                      <p>Order Status: {order.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CustomerPage;
