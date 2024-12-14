"use client";
import { BookImage } from "@/app/types/models";
import React, { useState } from "react";
import Image from "next/image";

interface BookDetailImagesProps {
  images: BookImage[];
  title: string;
}
const BookDetailImages: React.FC<BookDetailImagesProps> = ({
  images,
  title,
}) => {
  const [bookImageIndex, setBookImageIndex] = useState(0);
  const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

  return (
    <div className="book-images p-2">
      <Image
        id="book-image-active"
        className="book-image"
        src={
          images.length > 0
            ? `${images[bookImageIndex]?.image}`
            : "/assets/defaultBookImage.webp"
        }
        alt={title}
        width={2000}
        height={2000}
        priority
      />
      <div className="d-flex w-100 book-image-thumb-container">
        {images.length === 0 ? (
          <Image
            onClick={() => setBookImageIndex(0)}
            className="book-image-thumb"
            src="/assets/defaultBookImage.webp"
            alt="Default Book Image"
            width={100}
            height={100}
          />
        ) : (
          ""
        )}
        {images.map((image, index) => (
          <Image
            key={index}
            onClick={() => setBookImageIndex(index)}
            className="book-image-thumb"
            src={`${BASE_SERVER_URL}${image.image}`}
            alt={`Thumbnail ${index + 1}`}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};
export default BookDetailImages;
