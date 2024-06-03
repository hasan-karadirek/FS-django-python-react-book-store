import React, { useState } from "react";
import "../CSS/Navbar.css";
import Logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import NavCart from "./NavCart";
import NavbarUser from "./NavbarUser";
import useWindowSize from "../../hooks/useWindowSize";

interface NavbarProps {
  isSticky: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  return (
    <nav
      className={`navbar navbar-expand-lg ${isSticky ? "bg-white sticky-navbar" : "bg-transparent"}`}
    >
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
              <img src={facebook} alt="facebook" />
            </a>
            <a href="#">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="#">
              <img src={twitter} alt="twitter" />
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
