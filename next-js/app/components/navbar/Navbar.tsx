import React from "react";
import NavbarUser from "./NavbarUser";
import dynamic from "next/dynamic";
import Image from "next/image";

const StickyNavbarClient = dynamic(() => import("./StickyNavbar"), {
  ssr: false,
});
const NavCart = dynamic(() => import("./NavCart"), { ssr: false });
const NavbarToggle = dynamic(() => import("./NavbarToggle"), { ssr: false });

const Navbar: React.FC = () => {
  return (
    <>
      <StickyNavbarClient />
      <nav id="navbar" className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Image
              id="logo"
              src="/assets/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
            <span id="logo-title">Le Flaneur Amsterdam</span>
          </a>
          <NavbarToggle />
          <div id="nav-collapse" className="collapse navbar-collapse">
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
                <Image
                  src="/assets/instagram.png"
                  alt="instagram"
                  width={35}
                  height={35}
                />
              </a>
            </div>
            <NavbarUser />
          </div>
        </div>
        <NavCart />
      </nav>
    </>
  );
};

export default Navbar;
