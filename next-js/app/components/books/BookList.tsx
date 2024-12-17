import React from "react";
import { Book } from "../../types/models";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const RemoveFromCartButton = dynamic(
  () => import("../checkout/RemoveFromCartButton"),
  {
    ssr: false,
  },
);
const AddToCartButton = dynamic(() => import("../checkout/AddToCartButton"), {
  ssr: false,
});

interface BookListProps {
  books: Book[] | null;
}
const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="d-flex flex-wrap cards-container">
      {books?.map((book) => (
        <div className="book-card" key={book.id.toString()}>
          <div className="card" id={book.id.toString()}>
            <Link href={`/shop/books/${book.slug}`}>
              <Image
                src={
                  book.images[0]
                    ? `${book.images[0].image}`
                    : "/assets/defaultBookImage.webp"
                }
                className="card-img-top"
                alt={book.title}
                width={2000}
                height={2000}
                unoptimized={book.images[0] ? true : false}
              />
            </Link>
            <div className="card-body">
              <Link href={`/shop/books/${book.slug}`}>
                <h3 className="card-text">
                  {`${book.title} - ${book.author} - ${book.year} - ${book.publishing_house}`}{" "}
                </h3>
              </Link>
              <p> €{book.price}</p>
              <AddToCartButton
                btnClasses="btn btn-outline-success book-list-btn"
                btnText="Add To Cart"
                bookId={book.id}
              />
              <RemoveFromCartButton
                btnClasses="btn btn-danger book-list-btn"
                btnText="Remove From Cart"
                bookId={book.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
