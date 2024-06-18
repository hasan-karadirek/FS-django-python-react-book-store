import React, { useContext, useState } from "react";
import cartImage from "../../assets/shopping-bag.png";
import "../CSS/NavCart.css";
import { OrderContext } from "../../contexts/OrderContext";
import defaultBookImage from "../../assets/defaultBookImage.webp";
import RemoveFromCartButton from "../checkout/RemoveFromCartButton";
import { Link } from "react-router-dom";

interface NavCartProps {
  navContainerClass: string;
}

const NavCart: React.FC<NavCartProps> = ({ navContainerClass }) => {
  const { order } = useContext(OrderContext);

  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
  return (
    <div className={navContainerClass}>
      <img
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="nav-cart"
        src={cartImage}
        alt="cart-icon"
      />
      <span
        id="cart-item-count"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {order?.order_details?.length || 0}
      </span>

      <>
        <ul
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="nav-cart-list"
          style={{ display: isHover ? "block" : "none" }}
        >
          {order?.order_details?.length > 0 ? (
            <>
              {order?.order_details?.length > 0
                ? order?.order_details?.map((detail, index) => (
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
                        <Link
                          to={`/shop/books/${detail.book.slug}`}
                          style={{ color: "white" }}
                        >
                          <h4 className="cart-item-title">{`${detail.book.title} - ${detail.book.author} - ${detail.book.year} - ${detail.book.publishing_house}`}</h4>
                        </Link>
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
                  ))
                : ""}

              <li id="nav-cart-list-post-cost">
                <p>
                  Delivery Cost :{" "}
                  {JSON.parse(order?.post_cost) == 0
                    ? "Free Delivery"
                    : `${order?.post_cost}€`}
                </p>
              </li>
              <li id="nav-cart-list-cost">
                <p>
                  Total :{" "}
                  {JSON.parse(order?.cost) + JSON.parse(order?.post_cost)}€
                </p>
              </li>
              <li id="nav-cart-list-checkout-btn">
                <Link to="/shop/checkout">
                  <button className="btn btn-success">Go to Checkout</button>
                </Link>
              </li>
            </>
          ) : (
            <li style={{ padding: "1rem", listStyle: "none" }}>
              Your cart is empty.
            </li>
          )}
        </ul>
      </>
    </div>
  );
};

export default NavCart;
