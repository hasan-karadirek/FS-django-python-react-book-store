import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import "../CSS/Main.css";
import { OrderProvider } from "../../contexts/OrderContext";
import Footer from "./Footer";
import { ErrorProvider } from "../../contexts/ErrorContext";
import Alert from "./Alert";

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
      <ErrorProvider>
        <OrderProvider>
          <Navbar isSticky={isSticky} />
          <Alert />
          <Outlet />
          <Footer />
        </OrderProvider>
      </ErrorProvider>
    </>
  );
};
export default MainLayout;
