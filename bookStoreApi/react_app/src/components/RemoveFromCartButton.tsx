import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "./AddToCartButton";
import { OrderContext } from "../contexts/OrderContext";

interface RemoveFromCartButtonProps {
  bookId: number;
  btnClasses: string;
  btnText: string;
}

const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({
  bookId,
  btnClasses,
  btnText,
}) => {
  const { order, setOrder } = useContext(OrderContext);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/store/remove-from-cart/${bookId}/`,
    (response) => {
      localStorage.setItem("order", JSON.stringify(response.data));
      setOrder(response.data as Order);
    },
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    performFetch({
      method: "PUT",
      headers: {
        Authorization: "Token e434cdd2e5150d848a0477e83f61f3f501cb428f",
      },
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };

  return error ? (
    <p>{error.message}</p>
  ) : isLoading ? (
    <p>loading</p>
  ) : order?.order_details?.some((detail) => detail.book.id === bookId) ? (
    <button id={bookId.toString()} onClick={handleClick} className={btnClasses}>
      {btnText}
    </button>
  ) : (
    ""
  );
};

export default RemoveFromCartButton;
