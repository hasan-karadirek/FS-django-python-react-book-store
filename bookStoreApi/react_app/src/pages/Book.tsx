import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Book } from "../types/models";

import BookDetail from "../components/book/BookDetail";
import { Circles } from "react-loader-spinner";

const BookPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const { isLoading, error, performFetch } = useFetch(
    `/book/${slug}/`,
    (res) => {
      setBook(res.data as Book);
    },
  );
  useEffect(() => {
    performFetch();
  }, []);
  return (
    <>
      <div className="gap"></div>
      <nav className=" mt-3  fs-4 px-5" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop/books">Books</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {book ? `${book.title} - ${book.author} - ${book.year}` : ""}
          </li>
        </ol>
      </nav>
      {isLoading ? (
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
        <>
          {error ? (
            <p className="error">{error.message}</p>
          ) : book === null ? (
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
      )}
    </>
  );
};

export default BookPage;
