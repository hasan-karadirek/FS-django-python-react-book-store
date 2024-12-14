"use client";
import React, { useEffect, useRef } from "react";
import { Carousel } from "bootstrap";
import Image from "next/image";

const WelcomeSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = new Carousel(carouselRef.current, {
        interval: 8000,
        wrap: true,
        pause: false,
      });
      carousel.cycle();

      return () => {
        carousel.dispose();
      };
    }
  }, []);

  return (
    <>
      <div
        id="main-carousel"
        ref={carouselRef}
        className="main-slider carousel carousel-white slide"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#main-carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#main-carousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#main-carousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/assets/booksImg.jpeg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="Books Image"
              width={1920}
              height={1080}
              priority
            />
            <div className="carousel-caption d-md-block">
              <h1>Le Flaneur Amsterdam Second Hand Bookstore</h1>
              <p>Timeless books in numerous languages</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src="/assets/binnen.jpg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="Binnen Image"
              width={1920}
              height={1080}
            />
            <div className="carousel-caption d-md-block">
              <h1>Le Flaneur Amsterdam Second Hand Bookstore</h1>
              <p>Timeless books in numerous languages</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src="/assets/slide3.jpg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="Slide 3 Image"
              width={1920}
              height={1080}
            />
            <div className="carousel-caption d-md-block">
              <h1>Le Flaneur Amsterdam Second Hand Bookstore</h1>
              <p>Timeless books in numerous languages</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#main-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#main-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default WelcomeSection;
