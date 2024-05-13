import React, { useEffect, useState } from "react";
import SearchBar, { SearchFormData } from "../components/SearchBar";
import useFetch from "../hooks/useFetch";
import BookList from "../components/BookList";

interface BookImage {
  book: number;
  image: string;
}
interface Tag {
  tag: {
    id: number;
    name: string;
  };
}
export interface Book {
  id: number;
  isbn: string;
  env_no: number;
  title: string;
  author: string;
  publishing_house: string;
  language: string;
  cover: string;
  year: number;
  edition: string;
  category: string;
  condition_description: string;
  condition: string;
  price: string;
  status: string;
  tags: Tag[];
  images: BookImage[];
}
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
  useEffect(()=>{
    performFetch()
    
  },[searchFormData])

  const handleSearchFormSubmit = (formData: SearchFormData) => {
    setSearchFormData(formData)
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
