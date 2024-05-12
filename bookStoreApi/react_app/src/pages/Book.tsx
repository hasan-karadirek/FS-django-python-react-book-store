import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Book } from "./Books";

import BookDetail from "../components/BookDetail";

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/book/${id}`,
    (res) => {
      setBook(res.data as Book);
    },
  );
  useEffect(() => {
    performFetch();

    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  }, []);
  return error ? (
    <p>{error.message}</p>
  ) : isLoading ? (
    <p>loading</p>
  ) : (
    <>
      <div className="gap"></div>
      {book ? <BookDetail book={book} /> : <p>loading</p>}
    </>
  );
};

export default BookPage;
