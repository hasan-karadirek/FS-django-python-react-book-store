import React,{useEffect} from "react";
import "./CSS/WelcomeSection.css";
import slide1 from "../assets/booksImg.jpeg"
import { Carousel } from "bootstrap";

const WelcomeSection: React.FC = () => {
  useEffect(() => {
    const mainCarousel = document.querySelector("#main-carousel");
    const carousel = new Carousel(mainCarousel, {
      interval: 8000,
      wrap: true,
    });
    carousel.cycle();

    return () => {
      carousel.dispose();
    };
  }, []);
  return (
    <>
      <div id="main-carousel" className="main-slider  carousel carousel-white slide">
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
          <div className="carousel-item active" data-bs-interval="8000">
            <img
              src={slide1}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption  d-md-block">
              <h5>Le Flaneur Amsterdam</h5>
              <p>
                Buy, sell Turkish, English and Dutch Books.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="8000">
            <img
              src={slide1}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption  d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/1883859943/display_1500/stock-photo-the-word-example-is-written-on-a-magnifying-glass-on-a-yellow-background-1883859943.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption  d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
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
