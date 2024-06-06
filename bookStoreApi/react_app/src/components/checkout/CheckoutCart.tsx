import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import RemoveFromCartButton from "./RemoveFromCartButton";
import defaultBookImage from "../../assets/defaultBookImage.webp";

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
              <p id="nav-cart-item-price">{detail.book.price}</p>
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
        <p>Total : {order?.cost}€</p>
      </li>
    </ul>
  );
};

export default CheckoutCart;
