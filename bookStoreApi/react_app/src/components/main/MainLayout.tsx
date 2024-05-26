import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import "../CSS/Main.css";
import { OrderProvider } from "../../contexts/OrderContext";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 56;
      setIsSticky(window.scrollY > navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <OrderProvider>
        <Navbar isSticky={isSticky} />
        <Outlet />
        <Footer />
      </OrderProvider>
    </>
  );
};
export default MainLayout;
