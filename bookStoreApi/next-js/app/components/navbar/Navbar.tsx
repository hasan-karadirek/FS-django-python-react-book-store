'use client';
import React, { useEffect, useState } from "react";
import NavCart from "./NavCart";
import NavbarUser from "./NavbarUser";
import useWindowSize from "../../hooks/useWindowSize";
import CookiePopUp from "../main/CookiePopUp";
import { useRouter } from "next/router";  
import scrollWithOffset from "../../utils/scrollWithOffset";


const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 90;
      setIsSticky(window.scrollY > navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (window?.location.hash.includes("#")) {
        const id = window.location.hash.split("#")[1]; // Extract the hash
        setTimeout(() => scrollWithOffset(id, 120), 0); // Scroll with offset
    }
}, []);


  const [cookiePolicy, setCookiePolicy] = useState<boolean>(
    
  );

  useEffect(() => {
    const cookieP = localStorage.getItem("cookiePolicy");
    if (cookieP) {
      setCookiePolicy(JSON.parse(cookieP));
    }
  }, []);

  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  return (
    <nav
      className={`navbar navbar-expand-lg ${isSticky ? "bg-white sticky-navbar" : "bg-transparent"}`}
    >
      {cookiePolicy  ? (
        ""
      ) : (
        <CookiePopUp setCookiePolicy={setCookiePolicy} />
      )}
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img id="logo" src="assets/logo.png" alt="logo" />{" "}
          <span
            style={{
              fontSize:
                width > 778 ? "1.75rem" : width > 481 ? "1.5rem" : "1rem",
            }}
          >
            Le Flaneur Amsterdam
          </span>
        </a>
        <button
          className="navbar-toggler navbar-toggler-btn"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop/books">
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about-us">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#blog-posts">
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#testimonials">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contact-section">
                Contact
              </a>
            </li>
          </ul>
          <div id="social-container">
            <a href="#">
              <img src="assets/instagram.png" alt="instagram" />
            </a>
          </div>
          {width >= 992 ? (
            <NavCart navContainerClass="nav-cart-container" />
          ) : (
            ""
          )}
          <NavbarUser />
        </div>
      </div>
      {width < 992 ? (
        <NavCart navContainerClass="nav-cart-container-responsive" />
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
