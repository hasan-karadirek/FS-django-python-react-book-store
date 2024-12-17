"use client";
import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import RemoveFromCartButton from "./RemoveFromCartButton";
import Link from "next/link";
import Image from "next/image";


const CheckoutCart: React.FC = () => {

  const context = useContext(OrderContext);
  const order = context?.order || {order_details: [], cost: "0", post_cost:"0"}
  
  const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

  return order.order_details.length > 0 ? (
    <ul className="checkout-cart">
      {order?.order_details?.map((detail, index) => (
        <li key={index} className="d-flex p-3 nav-cart-list-item">
          <Image
            className="nav-cart-list-image"
            src={
              detail.book.images.length > 0
                ? `${detail.book.images[0].image}`
                : "/assets/defaultBookImage.webp"
            }
            alt={detail.book.title}
            width={90} // Adjust dimensions as necessary
            height={120}
          />
          <div className="nav-cart-list-body">
            <Link href={`/shop/books/${detail.book.slug}`}>
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
      ))}
      <li id="checkout-cart-list-cost">
        <p>Subtotal : {order?.cost}€</p>
      </li>
      <li className="d-flex">
        <Image
          src="/assets/postnl.png"
          alt="post-method"
          width={90} // Adjust dimensions as necessary
          height={40}
        />
        <h4>
          PostNL Standard Deliver for{" "}
          {order?.order_details.length == 1 ? "Single Book" : "Multiple Books"}
        </h4>
        <p>
          Delivery Cost :{" "}
          {JSON.parse(order?.post_cost) == 0
            ? "Free Delivery"
            : order?.post_cost}
          €
        </p>
      </li>
      <li id="checkout-cart-list-cost">
        <p>Total: {JSON.parse(order?.cost) + JSON.parse(order?.post_cost)}€</p>
      </li>
    </ul>
  ) : (
    <div className="container">Your cart is empty.</div>
  );
};

export default CheckoutCart;
