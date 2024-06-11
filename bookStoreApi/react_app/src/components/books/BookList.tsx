import React from "react";
import { Book } from "../../types/models";
import "../CSS/BookList.css";
import defaultBookImage from "../../assets/defaultBookImage.webp";
import { Link } from "react-router-dom";
import AddToCartButton from "../checkout/AddToCartButton";
import RemoveFromCartButton from "../checkout/RemoveFromCartButton";

interface BookListProps {
  books: Book[] | null;
}
const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="d-flex flex-wrap cards-container">
      {books?.map((book) => (
        <div className="book-card" key={book.id.toString()}>
          <div className="card" id={book.id.toString()}>
            <Link to={`/shop/books/${book.slug}`}>
              <img
                src={
                  book.images[0]
                    ? `${BASE_SERVER_URL}${book.images[0].image}`
                    : defaultBookImage
                }
                className="card-img-top"
                alt={book.title}
              />
            </Link>
            <div className="card-body">
              <Link to={`/shop/books/${book.slug}`}>
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
