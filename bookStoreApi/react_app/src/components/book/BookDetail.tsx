import React, { useState } from "react";
import { Book } from "../../types/models";
import { Link } from "react-router-dom";
import "../CSS/BookDetail.css";
import AddToCartButton from "../checkout/AddToCartButton";
import defaultBookImage from "../../assets/defaultBookImage.webp";
import RemoveFromCartButton from "../checkout/RemoveFromCartButton";

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [bookImageIndex, setBookImageIndex] = useState(0);

  const BASE_SERVER_URL = process.env.BASE_SERVER_URL;

  return (
    <>
      <div className="d-flex flex-wrap" id="book-info-image">
        <div className="book-images p-2">
          <img
            id="book-image-active"
            className="book-image"
            src={
              book.images.length > 0
                ? `${BASE_SERVER_URL}${book.images[bookImageIndex]?.image}`
                : defaultBookImage
            }
            alt={book.title}
          />
          <div className="d-flex  w-100 book-image-thumb-container ">
            {book.images.length === 0 ? (
              <img
                onClick={() => setBookImageIndex(0)}
                className="book-image-thumb"
                src={defaultBookImage}
              />
            ) : (
              ""
            )}
            {book.images.map((image, index) => (
              <img
                key={index}
                onClick={() => setBookImageIndex(index)}
                className="book-image-thumb"
                src={`${BASE_SERVER_URL}${image.image}`}
              />
            ))}
          </div>
        </div>
        <div className="book-infos">
          <h1>
            {`${book.title} - ${book.author} - ${book.year} - ${book.publishing_house}`}{" "}
          </h1>
          <span id="book-price">{book.price}$</span>
          <AddToCartButton
            bookId={book.id}
            btnClasses="btn btn-outline-success book-detail-btn"
            btnText="Add To Cart"
          />
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
                to={`/shop/books/?search=${t.tag.name}`}
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
