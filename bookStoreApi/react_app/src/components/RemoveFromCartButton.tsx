import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "./AddToCartButton";

interface RemoveFromCartButtonProps {
    bookId: number;
    btnClasses: string;
    btnText: string;
  }

const RemoveFromCartButton : React.FC<RemoveFromCartButtonProps> = ({bookId, btnClasses, btnText})=>{
    const [order, setOrder] = useState<Order | null>(null);
    const { isLoading, error, performFetch, cancelFetch } = useFetch(
        `/store/remove-from-cart/${bookId}/`,
        (response) => setOrder(response.data as Order),
      );
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        performFetch({
          method: "PUT",
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

    return <button id={bookId.toString()} onClick={handleClick} className={btnClasses}>
    {btnText}
  </button>
}

export default RemoveFromCartButton