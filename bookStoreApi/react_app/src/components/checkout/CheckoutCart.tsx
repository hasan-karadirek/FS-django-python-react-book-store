import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import RemoveFromCartButton from "./RemoveFromCartButton";
import defaultBookImage from "../../assets/defaultBookImage.webp";
import postnlLogo from "../../assets/postnl.png";

const CheckoutCart: React.FC = () => {
  const { order } = useContext(OrderContext);
  const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
  return (
    <ul className="checkout-cart">
      {order?.order_details?.map((detail, index) => (
        <li key={index} className="d-flex p-3 nav-cart-list-item">
          <img
            className="nav-cart-list-image"
            src={
              detail.book.images.length > 0
                ? `${BASE_SERVER_URL}${detail.book.images[0].image}`
                : defaultBookImage
            }
          />
          <div className="nav-cart-list-body">
            <h4 className="cart-item-title">{`${detail.book.title} - ${detail.book.author} - ${detail.book.year} - ${detail.book.publishing_house}`}</h4>
            <div className="d-flex">
              <p id="nav-cart-item-price">{detail.book.price}€</p>
              <RemoveFromCartButton
                btnClasses="btn btn-danger nav-cart-remove-btn"
                btnText="Remove"
                bookId={detail.book.id}
              />
            </div>
          </div>
        </li>
      ))}
      <li id="checkout-cart-list-cost">
        <p>Subtotal : {order?.cost}€</p>
      </li>
      <li className="d-flex">
        <img src={postnlLogo} style={{ width: "90px" }} alt="post-method" />
        <h4>
          PostNL Standard Deliver for{" "}
          {order.order_details.length == 1 ? "Single Book" : "Multiple Books"}
        </h4>
        <p>
          Delivery Cost :{" "}
          {JSON.parse(order.post_cost) == 0 ? "Free Delivery" : order.post_cost}
          €
        </p>
      </li>
      <li id="checkout-cart-list-cost">
        <p> Total: {JSON.parse(order?.cost) + JSON.parse(order?.post_cost)}€</p>
      </li>
    </ul>
  );
};

export default CheckoutCart;
