import React from "react";
import { Book } from "../../types/models";
import Link from "next/link";
import dynamic from "next/dynamic";
interface BookDetailProps {
  book: Book;
}
const RemoveFromCartButton = dynamic(
  () => import("../checkout/RemoveFromCartButton"),
  {
    ssr: false,
  },
);
const AddToCartButton = dynamic(() => import("../checkout/AddToCartButton"), {
  ssr: false,
});
const BookDetailImages = dynamic(() => import("./BookDetailImages"), {
  ssr: false,
});
const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <>
      <div className="d-flex flex-wrap" id="book-info-image">
        <BookDetailImages images={book.images} title={book.title} />
        <div className="book-infos">
          <h1>
            {`${book.title} - ${book.author} - ${book.year} - ${book.publishing_house}`}{" "}
          </h1>
          <span id="book-price">€{book.price}</span>
          {book.status.toLocaleUpperCase() === "OPEN" ? (
            <AddToCartButton
              bookId={book.id}
              btnClasses="btn btn-outline-success book-detail-btn"
              btnText="Add To Cart"
            />
          ) : (
            ""
          )}

          <RemoveFromCartButton
            btnClasses="btn btn-danger book-detail-btn"
            btnText="Remove From Cart"
            bookId={book.id}
          />
          <ul className="d-flex book-info-list">
            <div>
              <li className="p-2">
                Author: <span>{book.author}</span>{" "}
              </li>
              <li className="p-2">
                Publishing House: <span>{book.publishing_house}</span>
              </li>
              <li className="p-2">
                Year: <span>{book.year}</span>
              </li>
              <li className="p-2">
                Category: <span>{book.category}</span>
              </li>
              <li className="p-2">
                Edition: <span>{book.edition}</span>
              </li>
            </div>
            <div>
              <li className="p-2">
                Cover: <span>{book.cover}</span>
              </li>
              <li className="p-2">
                Condition: <span>{book.condition}</span>
              </li>
              <li className="p-2">
                Language: <span>{book.language}</span>
              </li>
              <li className="p-2">
                ISBN: <span>{book.isbn}</span>
              </li>
              <li className="p-2">
                Page: <span>{book.page}</span>
              </li>
            </div>
          </ul>
          <div id="book-tags">
            Tags:{" "}
            {book.tags.map((t) => (
              <Link
                key={t.tag.id}
                className="p-2"
                href={`/shop/books/?search=${t.tag.name}`}
              >
                {t.tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container book-detail-description">
        <h5>Description:</h5>
        {book.description}
        <br />
        <br />
        <h5>Condition Description:</h5>
        <span>{book.condition_description}</span>
      </div>
    </>
  );
};

export default BookDetail;
