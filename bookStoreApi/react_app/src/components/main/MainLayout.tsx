import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import "../CSS/Main.css";
import { OrderProvider } from "../../contexts/OrderContext";
import Footer from "./Footer";
import { ErrorProvider } from "../../contexts/ErrorContext";
import Alert from "./Alert";
import scrollWithOffset from "../../utils/scrollWithOffset";

const MainLayout: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
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
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollWithOffset(id, 120), 0);
    }
  }, [location]);
  return (
    <>
      <ErrorProvider>
        <OrderProvider>
          <header>
          <Navbar isSticky={isSticky} />
          <Alert />
          </header>
          <main>
          <Outlet />
          </main>
          <footer>
          <Footer />
          </footer>
        </OrderProvider>
      </ErrorProvider>
    </>
  );
};
export default MainLayout;
