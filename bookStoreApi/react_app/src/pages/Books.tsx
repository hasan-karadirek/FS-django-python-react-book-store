import React, { useEffect, useState } from "react";
import SearchBar from "../components/books/SearchBar";
import { SearchFormData } from "../types/forms";
import useFetch from "../hooks/useFetch";
import BookList from "../components/books/BookList";
import { Book } from "../types/models";
import { Circles } from "react-loader-spinner";

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchFormData, setSearchFormData] = useState<SearchFormData | null>(
    null,
  );
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/book/?search=${searchFormData?.search ? searchFormData.search : ""}`,
    (res) => {
      setBooks(res.data as Book[]);
    },
  );
  useEffect(() => {
    performFetch();
  }, [searchFormData]);

  const handleSearchFormSubmit = (formData: SearchFormData) => {
    setSearchFormData(formData);
    return () => {
      if (!isLoading) {
        return cancelFetch();
      }
    };
  };
  return error ? (
    <p>{error.message}</p>
  ) : (
    <>
      <div className="gap"></div>
      <SearchBar handleSearchFormSubmit={handleSearchFormSubmit} />
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
      ) : error ? (
        <p className="error">{error.message}</p>
      ) : (
        <BookList books={books} />
      )}
    </>
  );
};

export default Books;
