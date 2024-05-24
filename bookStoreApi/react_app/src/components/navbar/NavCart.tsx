import React, { useContext, useState } from "react";
import cartImage from "../../assets/shopping-bag.png";
import "../CSS/NavCart.css";
import { OrderContext } from "../../contexts/OrderContext";
import slide1 from "../../assets/booksImg.jpeg";
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
          {order?.order_details?.map((detail, index) => (
            <li key={index} className="d-flex p-3 nav-cart-list-item">
              <img
                className="nav-cart-list-image"
                src={
                  detail.book.images.length > 0
                    ? `http://localhost:8000${detail.book.images[0].image}`
                    : slide1
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
          <li id="nav-cart-list-cost">
            <p>Total : {order?.cost}$</p>
          </li>
          <li id="nav-cart-list-checkout-btn">
            <Link to="/shop/checkout">
              <button className="btn btn-success">Go to Checkout</button>
            </Link>
          </li>
        </ul>
      </>
    </div>
  );
};

export default NavCart;
