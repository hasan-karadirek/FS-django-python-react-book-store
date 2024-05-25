import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Book } from "../types/models";

import BookDetail from "../components/book/BookDetail";
import { Circles } from "react-loader-spinner";

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const { isLoading, error, performFetch } = useFetch(`/book/${id}`, (res) => {
    setBook(res.data as Book);
  });
  useEffect(() => {
    performFetch();
  }, []);
  return error ? (
    <p>{error.message}</p>
  ) : (
    <>
      <div className="gap"></div>
      {isLoading || book === null ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <BookDetail book={book} />
      )}
    </>
  );
};

export default BookPage;
