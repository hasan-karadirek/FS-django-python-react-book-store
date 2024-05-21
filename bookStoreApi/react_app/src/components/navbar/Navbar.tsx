import React, { useState } from "react";
import "../CSS/Navbar.css";
import Logo from "../../assets/303178780_487833293365662_2765766073040987699_n.jpg";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import NavCart from "./NavCart";
import NavbarUser from "./NavbarUser";

interface NavbarProps {
  isSticky: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  return (
    <nav
      className={`navbar navbar-expand-lg ${isSticky ? "bg-white sticky-navbar" : "bg-transparent"}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img id="logo" src={Logo} alt="" />{" "}
          <span style={{ fontSize: "2rem" }}>Le Flaneur</span>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
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
          <NavCart />
          <NavbarUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
