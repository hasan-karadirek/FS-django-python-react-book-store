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
import { Helmet } from 'react-helmet';
import Logo from "../assets/logo.png";

const Books: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchFormData, setSearchFormData] = useState<SearchFormData | null>({
    search: searchParams.get("search"),
    page: parseInt(searchParams.get("page")),
    category: searchParams.get("category"),
    language: searchParams.get("language"),
    tag: searchParams.get("tag"),
  });
  const [pagination, setPagination] = useState<BookListResponse | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/book/?search=${searchFormData?.search ? searchFormData.search : ""}&page=${searchFormData?.page ? searchFormData.page : 1}&category=${searchFormData?.category ? searchFormData.category : ""}&language=${searchFormData?.language ? searchFormData.language : ""}&tag=${searchFormData?.tag ? searchFormData.tag : ""}`,
    (res) => {
      const resData = res.data as BookListResponse;
      setPagination(resData);
      setBooks(resData.page);
    },
  );
  useEffect(() => {
    searchParams.set(
      "page",
      searchFormData?.page ? searchFormData?.page?.toString() : "",
    );

    searchParams.set(
      "search",
      searchFormData?.search ? searchFormData.search : "",
    );

    searchParams.set(
      "category",
      searchFormData?.category ? searchFormData.category : "",
    );

    searchParams.set(
      "language",
      searchFormData?.language ? searchFormData.language : "",
    );

    navigate({ search: searchParams.toString() });

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

  return (
    <>
    <Helmet>
    <title>{`Le Flaneur Second Hand Book Store - Books in ${searchFormData.category ? searchFormData.category : "All"} Category(s) and in ${searchFormData.language ? searchFormData.language : "All"} Language(s)`}</title>
      <meta property="og:title" content={`Le Flaneur Second Hand Book Store - Books in ${searchFormData.category} Category(s) and in ${searchFormData.language} Language(s)`} />
      <meta property="og:description" content={`Le Flaneur Second Hand Book Store - Books in ${searchFormData.category} Category(s) and in ${searchFormData.language} Language(s)`} />
      <meta property="og:image" content={Logo} />
    </Helmet>
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
            {searchFormData.category === "" || searchFormData.category === null
              ? "All"
              : searchFormData.category}
          </li>
        </ol>
      </nav>
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
          <Pagination
            pagination={pagination}
            setSearchFormData={setSearchFormData}
          />
        </>
      )}
    </>
  );
};

export default Books;
