"use client";
import React, { useEffect, useState } from "react";

const NavbarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const collapse = document.getElementById("nav-collapse");
    if (isOpen) {
      collapse?.classList.add("show");
    } else {
      collapse?.classList.remove("show");
    }
  }, [isOpen]);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <button
      className="navbar-toggler navbar-toggler-btn"
      type="button"
      aria-label="Toggle navigation"
      onClick={toggleNavbar}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};
export default NavbarToggle;
