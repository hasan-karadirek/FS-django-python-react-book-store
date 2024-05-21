import React, { useEffect, useState } from "react";
import SearchBar from "../components/books/SearchBar";
import { SearchFormData } from "../types/forms";
import useFetch from "../hooks/useFetch";
import BookList from "../components/books/BookList";
import { Book } from "../types/models";

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
  ) : isLoading ? (
    <p>loading</p>
  ) : (
    <>
      <div className="gap"></div>
      <SearchBar handleSearchFormSubmit={handleSearchFormSubmit} />
      {isLoading ? "wait" : <BookList books={books} />}
    </>
  );
};

export default Books;
