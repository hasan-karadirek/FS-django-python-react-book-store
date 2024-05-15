import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Book } from "../pages/Books";
import { OrderContext } from "../contexts/OrderContext";
interface AddToCartButtonProps {
  bookId: number;
  btnClasses: string;
  btnText: string;
}
interface OrderDetail {
  id: number;
  order: number;
  book: Book;
}
export interface Order {
  id: number;
  customer: number;
  cost: string;
  address: string;
  status: string;
  order_details: OrderDetail[];
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        Authorization: "Token 555ef6a75ff78bc5c2d1f20dda814493039a9a89",
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
    ""
  ) : (
    <button id={bookId.toString()} onClick={handleClick} className={btnClasses}>
      {btnText}
    </button>
  );
};

export default AddToCartButton;
