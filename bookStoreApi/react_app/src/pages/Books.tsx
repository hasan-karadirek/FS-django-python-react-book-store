import React, { useEffect, useState } from "react";
import SearchBar from "../components/books/SearchBar";
import { SearchFormData } from "../types/forms";
import useFetch from "../hooks/useFetch";
import BookList from "../components/books/BookList";
import { Book } from "../types/models";
import { Circles } from "react-loader-spinner";
import Pagination from "../components/books/Pagination";
import { useNavigate } from "react-router-dom";
import { BookListResponse } from "../types/responses";



const Books: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const navigate=useNavigate()


  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchFormData, setSearchFormData] = useState<SearchFormData | null>({
    search:searchParams.get("search"),
    page:parseInt(searchParams.get("page"))
  }
  );
  const [pagination, setPagination] = useState<BookListResponse | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/book/?search=${searchFormData?.search ? searchFormData.search : ""}&page=${searchFormData?.page ? searchFormData.page : 1}`,
    (res) => {
      const resData = res.data as BookListResponse;
      setPagination(resData);
      setBooks(resData.page);
    }
  );
  useEffect(() => {
    
      searchParams.set("page",searchFormData?.page ? searchFormData?.page?.toString() : "")
    
      searchParams.set("search",searchFormData?.search ? searchFormData.search : "")

      navigate({search:searchParams.toString()})
    
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

  const handlePageChange = (pageNumber: number) => {
    setSearchFormData((prevForm) => ({
      ...prevForm,
      page: pageNumber,
    }));
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
        <>
          <BookList books={books} />
          <Pagination pagination={pagination} setSearchFormData={setSearchFormData}/>
        </>
      )}
    </>
  );
};

export default Books;
