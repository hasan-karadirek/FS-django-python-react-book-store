import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Order } from "../../types/models";
import { OrderContext } from "../../contexts/OrderContext";
import Cookies from "js-cookie";
import { Bars } from "react-loader-spinner";

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
  const { order, setOrder } = useContext(OrderContext);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/store/add-to-cart/${bookId}/`,
    (response) => {
      localStorage.setItem("order", JSON.stringify(response.data));
      setOrder(response.data as Order);
    },
  );
  useEffect(() => {
    if (error?.name === "expired_token" || error?.name === "invalid_token") {
      Cookies.remove("token");
      Cookies.remove("session_id");
      localStorage.clear();
      location.reload();
    }
  }, [error]);
  const csrfToken = Cookies.get("csrftoken")
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
          : "",
          "X-CSRFToken":csrfToken
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
        id={bookId.toString()}
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
