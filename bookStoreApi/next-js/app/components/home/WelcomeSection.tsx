'use client';
import React, { useEffect } from "react";
import { Carousel } from "bootstrap";

const WelcomeSection: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mainCarousel = document.querySelector("#main-carousel");
      if (mainCarousel) {
        const carousel = new Carousel(mainCarousel, {
          interval: 8000,
          wrap: true,
          pause: false,
        });
        carousel.cycle();

        return () => {
          carousel.dispose();
        };
      }
    }
  }, []);
  return (
    <>
      <div
        id="main-carousel"
        className= "main-slider  carousel carousel-white slide"
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
            <img
              src="assets/booksImg.jpeg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="..."
            />

            <div className="carousel-caption  d-md-block">
              <h1>Le Flaneur Amsterdam Second Hand Bookstore</h1>
              <p>Timeless books in numerous languages</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="assets/binnen.jpg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="..."
            />

            <div className="carousel-caption  d-md-block">
              <h1>Le Flaneur Amsterdam Second Hand Bookstore</h1>
              <p>Timeless books in numerous languages</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="assets/slide3.jpg"
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="..."
            />

            <div className="carousel-caption  d-md-block">
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
