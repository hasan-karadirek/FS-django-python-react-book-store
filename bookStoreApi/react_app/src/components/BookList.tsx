import React from "react";
import { Book } from "../types/models";
import "./CSS/BookList.css";
import slide1 from "../assets/booksImg.jpeg";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

interface BookListProps {
  books: Book[] | null;
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="d-flex flex-wrap cards-container">
      {books?.map((book) => (
        <Link
          to={`/shop/books/${book.id.toString()}`}
          className="book-card"
          key={book.id.toString()}
        >
          <div className="card" id={book.id.toString()}>
            <img
              src={
                book.images[0]
                  ? `http://localhost:8000${book.images[0].image}`
                  : slide1
              }
              className="card-img-top"
              alt={book.title}
            />
            <div className="card-body">
              <h3 className="card-text">
                {`${book.title} - ${book.author} - ${book.year} - ${book.publishing_house}`}{" "}
              </h3>
              <p>{book.price}</p>
              <AddToCartButton
                btnClasses="btn btn-outline-success"
                btnText="Add To Cart"
                bookId={book.id}
              />
              <RemoveFromCartButton
                btnClasses="btn btn-danger"
                btnText="Remove From Cart"
                bookId={book.id}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookList;
