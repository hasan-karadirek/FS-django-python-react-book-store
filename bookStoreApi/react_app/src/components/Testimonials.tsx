import React, { useEffect } from "react";
import "./CSS/Testimonials.css";
import ImageG from "../assets/books3.jpeg";
import ImageG1 from "../assets/books4.jpeg";
import ImageG2 from "../assets/books12.jpeg";
import ImageG3 from "../assets/books11.jpeg";
import { Carousel } from "bootstrap";

const Testimonials: React.FC = () => {
  useEffect(() => {
    const tCarousel = document.querySelector("#carousel-testimonials");
    const carousel = new Carousel(tCarousel, {
      interval: 5000,
      wrap: true,
    });
    carousel.cycle();

    return () => {
      carousel.dispose();
    };
  }, []);

  return (
    <div id="testimonials">
      <div className=" testimonials">
        <div className="testimonials-images d-flex">
          <img src={ImageG} alt="" />
          <img src={ImageG1} alt="" />
          <img src={ImageG2} alt="" />
          <img src={ImageG3} alt="" />
        </div>
        <br />
        <h4 id="testimonials-title">
          We are excited about our customer reviews
        </h4>
        <br />
        <div
          id="carousel-testimonials"
          className="carousel carousel-dark slide"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carousel-testimonials"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel-testimonials"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel-testimonials"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="testimonial-blockquote">
                  <blockquote style={{ position: "relative" }}>
                    <p className="testimonial-message">
                      cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi
                      cok iyi cok iyi cok iyi asfasf aa sf asdf as fdq wg a s fa
                      f a s f as
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="testimonial-blockquote">
                  <blockquote style={{ position: "relative" }}>
                    <p className="testimonial-message">
                      cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi
                      cok iyi cok iyi cok iyi asfasf aa sf asdf as fdq wg a s fa
                      f a s f as
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="testimonial-blockquote">
                  <blockquote style={{ position: "relative" }}>
                    <p className="testimonial-message">
                      cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi cok iyi
                      cok iyi cok iyi cok iyi asfasf aa sf asdf as fdq wg a s fa
                      f a s f as
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
