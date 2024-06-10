import React, { useEffect, useState } from "react";
import "../CSS/Footer.css";
import Logo from "../../assets/logo.png";
import useWindowSize from "../../hooks/useWindowSize";

const Footer: React.FC = () => {
  const { width } = useWindowSize();
  const [isFixed, setIsFixed] = useState<boolean>(
    document.documentElement.scrollHeight <= window.innerHeight,
  );

  useEffect(() => {
    const checkPageHeight = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setIsFixed(docHeight < viewportHeight);
    };

    checkPageHeight();
    window.addEventListener("resize", checkPageHeight);

    const observer = new MutationObserver(() => {
      checkPageHeight();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      window.removeEventListener("resize", checkPageHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`footer ${isFixed ? "fixed-footer" : ""}`}>
      <div className={`${width > 420 ? "d-flex" : "block"} py-4`}>
        <div className="footer-left flex-grow-1">
          <a className="navbar-brand" href="/">
            <img id="logo" src={Logo} alt="" />
            <span
              style={{
                fontSize:
                  width > 778 ? "2rem" : width > 481 ? "1.5rem" : "1rem",
              }}
            >
              Le Flaneur Amsterdam
            </span>
          </a>
        </div>
        <div className="footer-right flex-grow-1">
          <ul>
            <li className="p-2">KvK:- </li>
            <li className="p-2">Adress: Pirinsengracht 260, 1016 HG Amsterdam</li>
            <li className="p-2">Tel: - </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
