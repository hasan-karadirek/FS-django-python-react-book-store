"use client";
import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Order } from "../../types/models";
import { OrderContext } from "../../contexts/OrderContext";
import Cookies from "js-cookie";
import { Bars } from "react-loader-spinner";
import { ErrorContext } from "../../contexts/ErrorContext";
import { clearLocalStorage, setLocalStorage } from "@/app/utils/LocalStorage";

interface AddToCartButtonProps {
  bookId: number;
  btnClasses: string;
  btnText: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  bookId,
  btnClasses,
  btnText,
}) => {
  const context = useContext(OrderContext);
  const order = context?.order || {order_details: []}
  const setOrder = context?.setOrder || (function(){});
  

  const errorContext = useContext(ErrorContext);
   
   const  setCustomError  = errorContext?.setCustomError || function(){};

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/store/add-to-cart/${bookId}/`,
    (response) => {
      setLocalStorage("order", JSON.stringify(response.data));
      setOrder(response.data as Order);
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!Cookies.get("session_id")) {
      Cookies.set("session_id", Date.now().toString());
    }
    performFetch({
      method: "POST",
      headers: {
        Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : ""
      },
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };
  return order?.order_details?.some((detail) => detail.book.id === bookId) ? (
    ""
  ) : (
    <>
      <button
        id={`add-${bookId.toString()}`}
        onClick={handleClick}
        className={btnClasses}
      >
        {isLoading ? (
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{ justifyContent: "center" }}
            wrapperClass="cart-buttons-loading"
            visible={true}
          />
        ) : (
          btnText
        )}
      </button>
      {error ? <p className="error">{error.message}</p> : ""}
    </>
  );
};

export default AddToCartButton;
