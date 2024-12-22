"use client";
import React, { useEffect } from "react";
import scrollWithOffset from "../../utils/scrollWithOffset";
import CookiePopUp from "../main/CookiePopUp";

const StickyNavbarClient: React.FC = () => {
  useEffect(() => {
    if (window?.location.hash.includes("#")) {
      const id = window.location.hash.split("#")[1]; // Extract the hash
      setTimeout(() => scrollWithOffset(id, 120), 0); // Scroll with offset
    }
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sentinel = document.getElementById("sentinel");

    if (navbar && sentinel) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-white", "sticky-navbar");
          } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white", "sticky-navbar");
          }
        },
        { threshold: [0] },
      );

      observer.observe(sentinel);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <CookiePopUp />
      <div id="sentinel" style={{ height: "1px" }}></div>
    </>
  );
};

export default StickyNavbarClient;
