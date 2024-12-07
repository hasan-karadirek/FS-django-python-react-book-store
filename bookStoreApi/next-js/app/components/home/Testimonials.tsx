'use client';
import React, { useEffect } from "react";
import styles from "./Testimonials.module.css";
import { Carousel } from "bootstrap";
import useWindowSize from "../../hooks/useWindowSize";

const Testimonials: React.FC = () => {
  const { width } = useWindowSize();
  useEffect(() => {
    const tCarousel = document.querySelector("#carousel-testimonials");
    const carousel = new Carousel(tCarousel, {
      interval: 5000,
      wrap: true,
      pause: false,
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
          <img src="assets/reviewImage.jpg" alt="testimonials-image-1" />
          <img src="assets/reviewImage2.jpg" alt="testimonials-image-2" />
          {width > 768 ? (
            <>
              <img src="assets/reviewImage3.jpg" alt="testimonials-image-3" />
              <img src="assets/reviewImage4.jpg" alt="testimonials-image-4" />
            </>
          ) : (
            ""
          )}
        </div>
        <br />
        

        <div
          id="carousel-testimonials"
          className="carousel carousel-white slide"
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
            <div className="carousel-item active">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="col-md-8 offset-md-2">
                  <div className="testimonial-card">
                    <p className="quote">
                      &ldquo;Gezellig, geen druk om te kopen. Véél oude boeken.
                      Ik heb zelfs Kruistocht in spijkerbroek gezien! Één van
                      mijn favoriete jeugdboeken. Ook andere talen aanwezig. Ga
                      dat zien! Er zijn helaas niet veel meer van dit soort
                      tweedehands boekenwinkels.&ldquo;
                    </p>
                    <a
                      target="_blank"
                      href="https://www.google.com/search?sa=X&sca_esv=5aa8bd575662fb0a&rlz=1C1GCEA_enNL980NL983&hl=tr-NL&tbm=lcl&sxsrf=ADLYWIKaM-rkdmeukbTCPwOr8gKV28yFPw:1716680700758&q=le%20flaneur%20amsterdam%20yorumlar%C4%B1&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NjM1NzQwNrCwMDU1tTAyNbM02cDI-IpRPidVIS0nMS-1tEghMbe4JLUoJTFXoTK_qDQ3J7HoyMZFrIRUAACNOfqfXgAAAA&rldimm=3657103088555825694&ved=0CBAQ5foLahcKEwjAmcGL_qmGAxUAAAAAHQAAAAAQBQ&biw=1775&bih=917&dpr=1#lkt=LocalPoiReviews&arid=ChZDSUhNMG9nS0VJQ0FnSUNwN1p1dllBEAE"
                      rel="noreferrer"
                    >
                      Bobje Catootje
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="col-md-8 offset-md-2">
                  <div className="testimonial-card">
                    <p className="quote">
                      &ldquo;Really diverse collection, wonderful vibes ahah,
                      the owner was super friendly. It felt like I got in a
                      fairy-tale. All books are unexpectedly affordable, I got
                      Kafka for just 8 euro, but some other (known) classical
                      books were 5 euro.&ldquo;
                    </p>
                    <a
                      target="_blank"
                      href="https://www.google.com/search?sa=X&sca_esv=5aa8bd575662fb0a&rlz=1C1GCEA_enNL980NL983&hl=tr-NL&tbm=lcl&sxsrf=ADLYWIKaM-rkdmeukbTCPwOr8gKV28yFPw:1716680700758&q=le%20flaneur%20amsterdam%20yorumlar%C4%B1&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NjM1NzQwNrCwMDU1tTAyNbM02cDI-IpRPidVIS0nMS-1tEghMbe4JLUoJTFXoTK_qDQ3J7HoyMZFrIRUAACNOfqfXgAAAA&rldimm=3657103088555825694&ved=0CEIQ5foLahcKEwjY9rXl_qmGAxUAAAAAHQAAAAAQCA&biw=1775&bih=917&dpr=1#lkt=LocalPoiReviews&arid=ChdDSUhNMG9nS0VJQ0FnSUM1b2VYendBRRAB"
                      rel="noreferrer"
                    >
                      Polina Vasilyeva
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial-carousel-caption carousel-caption  d-md-block">
                <div className="col-md-8 offset-md-2">
                  <div className="testimonial-card">
                    <p className="quote">
                      &ldquo;Nice second hand bookshop. It has a very smart
                      organisation in terms of languages: English books on the
                      right and Dutch on the left, and within this division many
                      topics. The shop is bigger than it looks, and it has a
                      nice spot at the end with place to sit and some art
                      prints.&ldquo;
                    </p>
                    <a
                      target="_blank"
                      href="https://www.google.com/search?sa=X&sca_esv=5aa8bd575662fb0a&rlz=1C1GCEA_enNL980NL983&hl=tr-NL&tbm=lcl&sxsrf=ADLYWIKaM-rkdmeukbTCPwOr8gKV28yFPw:1716680700758&q=le%20flaneur%20amsterdam%20yorumlar%C4%B1&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NjM1NzQwNrCwMDU1tTAyNbM02cDI-IpRPidVIS0nMS-1tEghMbe4JLUoJTFXoTK_qDQ3J7HoyMZFrIRUAACNOfqfXgAAAA&rldimm=3657103088555825694&ved=0CCkQ5foLahcKEwiI--Hl_amGAxUAAAAAHQAAAAAQCA&biw=1775&bih=917&dpr=1#lkt=LocalPoiReviews&arid=ChdDSUhNMG9nS0VJQ0FnSUNENU52Vzh3RRAB"
                      rel="noreferrer"
                    >
                      R. Sabater
                    </a>
                  </div>
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
