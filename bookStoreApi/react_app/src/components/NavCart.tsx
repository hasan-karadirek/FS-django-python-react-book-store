import React, { useContext, useState } from "react";
import cartImage from "../assets/shopping-bag.png";
import "./CSS/NavCart.css";
import { OrderContext } from "../contexts/OrderContext";
import slide1 from "../assets/booksImg.jpeg";
import RemoveFromCartButton from "./RemoveFromCartButton";
import { Link } from "react-router-dom";

const NavCart: React.FC = () => {
  const { order, setOrder } = useContext(OrderContext);

  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <img
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="nav-cart"
        src={cartImage}
        alt="cart-icon"
      />
      <span id="cart-item-count">{order?.order_details?.length || 0}</span>
      {isHover ? (
        <>
        
        <ul onMouseEnter={handleMouseEnter}
         className="nav-cart-list">
          {order?.order_details?.map((detail) => (
            <li className="d-flex p-3 nav-cart-list-item">
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
                <div className="d-flex" ><p id="nav-cart-item-price">{detail.book.price}</p><RemoveFromCartButton
                  btnClasses="btn btn-danger nav-cart-remove-btn"
                  btnText="Remove"
                  bookId={detail.book.id}
                /></div>
              </div>
            </li>
          ))}
          <li id="nav-cart-list-cost"><p>Total : {order.cost}$</p></li>
          <li id="nav-cart-list-checkout-btn"><Link to="/shop/checkout"><button className="btn btn-success">Go to Checkout</button></Link></li>
        </ul>
        <p></p></>
      ) : (
        ""
      )}
    </>
  );
};

export default NavCart;
