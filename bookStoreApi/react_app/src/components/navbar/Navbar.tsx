import React, { useState } from "react";
import "../CSS/Navbar.css";
import Logo from "../../assets/logo.png";
import instagram from "../../assets/instagram.png";
import NavCart from "./NavCart";
import NavbarUser from "./NavbarUser";
import useWindowSize from "../../hooks/useWindowSize";
import Cookies from "js-cookie";
import CookiePopUp from "../main/CookiePopUp";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  isSticky: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const loc = useLocation();
  const cookieP = localStorage.getItem("cookiePolicy")
  const [cookiePolicy,setCookiePolicy] = useState<boolean>(cookieP ? JSON.parse(cookieP) : false )

  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  return (
    <nav
      className={`navbar navbar-expand-lg ${isSticky ? "bg-white sticky-navbar" : "bg-transparent"}`}
    >
      {cookiePolicy ||  loc.pathname.split("/")[loc.pathname.split("/").length - 1] === "cookie-policy"  ? "" : <CookiePopUp setCookiePolicy={setCookiePolicy}/>}
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img id="logo" src={Logo} alt="logo" />{" "}
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
              <img src={instagram} alt="instagram" />
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
