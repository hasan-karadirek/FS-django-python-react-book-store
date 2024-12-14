import React from "react";
import BookList from "../../components/books/BookList";
import { Book } from "../../types/models";
import Pagination from "../../components/books/Pagination";
import { FetchResponse } from "../../hooks/useFetch";
import { BookListResponse } from "../../types/responses";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Book - Le Flaneur Amsterdam - Second Hand Book Store",
  description:
    "Discover a wide range of affordable, high-quality second-hand books at our online bookstore. Browse, search, and buy your favorite books with ease. Sustainable reading made simple!",
  keywords: ["Second hand book", "Turkish book", "Dutch book", "German Book"],
  openGraph: {
    title: "Le Flaneur Amsterdam - Second Hand Book Store",
    description:
      "Discover a wide range of affordable, high-quality second-hand books at our online bookstore.",
    url: "https://leflaneuramsterdam.com",
    siteName: "Le Flaneur Amsterdam Second Hand Book",
    images: [
      {
        url: "/assets/logo.png/",
        width: 1200,
        height: 630,
        alt: "logo",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const SearchBar = dynamic(() => import("../../components/books/SearchBar"), {
  ssr: false,
});

const Books = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

  const res = await fetch(
    `${BASE_SERVER_URL}/api/book/?search=${searchParams.search ? searchParams.search : ""}&page=${searchParams.page ? searchParams.page : 1}&category=${searchParams.category ? searchParams.category : ""}&language=${searchParams.language ? searchParams.language : ""}&tag=${searchParams.tag ? searchParams.tag : ""}`,
    { cache: "no-store" });
  const resJson: FetchResponse = await res.json();

  const pagination: BookListResponse = resJson.data as BookListResponse;
  const books: Book[] = pagination?.page;

  return (
    <>
      <div className="gap"></div>
      {/* <div className="overlay"></div>
      <div className="container shop-warning">
              We are working on bringing our books to you online. Our shop is currently out of service, but soon it will be possible to buy books online.
              <br/><br/>
              <a href="/" className="btn btn-success">Go back to home</a>
      </div> */}
      <nav className=" mt-3  fs-4 px-5" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop/books">Books</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {/* {searchFormData.category === "" || searchFormData.category === null
              ? "All"
              : searchFormData.category} */}
            All
          </li>
        </ol>
      </nav>
      <SearchBar />

      <>
        <BookList books={books} />
        <Pagination pagination={pagination} />
      </>
    </>
  );
};

export default Books;
