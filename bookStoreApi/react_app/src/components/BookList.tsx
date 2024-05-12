import React, { useState } from "react";
import { Book } from "../pages/Books";
import "./CSS/BookList.css";
import slide1 from "../assets/booksImg.jpeg";
import { Link } from "react-router-dom";

interface BookListProps {
  products: Book[] | null;
}

const BookList: React.FC<BookListProps> = ({ products }) => {
  return (
    <div className="d-flex flex-wrap">
      {products?.map((product) => (
        <Link to={`/shop/books/${product.id.toString()}`} className="product-card" key={product.id.toString()}>
          <div
            className="card "
            id={product.id.toString()}
            
          >
            <img
              src={
                product.images[0]
                  ? `http://localhost:8000${product.images[0].image}`
                  : slide1
              }
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <p className="card-text">{product.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookList;
