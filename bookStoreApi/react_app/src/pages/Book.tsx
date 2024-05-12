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
    }
  );
  useEffect(() => {
    performFetch();
  }, []);
  return isLoading ? (
    "loading"
  ) : book ? (
    <>
      <div className="gap"></div>
     <BookDetail book={book}/>
      
    </>
  ) : (
    "loading"
  );
};

export default BookPage;
 