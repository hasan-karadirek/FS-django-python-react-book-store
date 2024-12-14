import React from "react";
import { Book } from "../../../types/models";
import BookDetail from "../../../components/book/BookDetail";
import type { Metadata } from "next";

const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

interface BookPageProps {
  params: {
    slug: string;
  };
}

async function fetchBookData(slug: string): Promise<Book> {
  const res = await fetch(`${BASE_SERVER_URL}/api/book/${slug}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch book data");
  }
  const data = await res.json();
  return data.data;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const book: Book = await fetchBookData(params.slug);

  return {
    title: `${book.title} - ${book.author} - ${book.publishing_house}`,
    description: `${book.title} by ${book.author}, published by ${book.publishing_house}.`,
    keywords: [
      "Second hand books",
      "Turkish Books",
      "Dutch Books",
      "German Books",
      book.title,
      book.author,
      book.publishing_house,
    ],
  };
}

const BookPage = async ({ params }: BookPageProps) => {
  const book: Book = await fetchBookData(params.slug);

  return (
    <>
      <div className="gap"></div>
      <nav className="mt-3 fs-4 px-5" aria-label="breadcrumb">
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
      <BookDetail book={book} />
    </>
  );
};

export default BookPage;
