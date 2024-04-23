import React from "react";
import "./CSS/Navbar.css"
import Logo from "../assets/303178780_487833293365662_2765766073040987699_n.jpg"

interface NavbarProps {
    isSticky: boolean;
  }
const Navbar : React.FC<NavbarProps>=({isSticky})=>{
    return <nav className={`navbar navbar-expand-lg ${isSticky ? 'bg-white sticky-navbar' : 'bg-transparent'}`}>
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><img id="logo" src={Logo} alt="" /></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>

        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
}

export default Navbar