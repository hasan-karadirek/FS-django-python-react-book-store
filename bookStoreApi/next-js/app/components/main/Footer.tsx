"use client";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const { width } = useWindowSize();
  const [isFixed, setIsFixed] = useState<boolean | null>(
    typeof window !== "undefined"
      ? document.documentElement.scrollHeight < window.innerHeight
      : null,
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
      <div
        className={`${width > 420 ? "d-flex" : "block"} pt-4  container`}
        style={{ justifyContent: "space-between" }}
      >
        <div className="footer-logo">
          <a className="navbar-brand" href="/">
            <Image
              id="logo"
              src="/assets/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
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
        <div className="footer-block-2">
          <h5>Infos:</h5>
          <ul>
            <li className="">KvK: 87287250 </li>
            <li className="">Adress: Prinsengracht 260, 1016 HG Amsterdam</li>
            <li className="">Tel: +31680042091 </li>
          </ul>
        </div>
        <div className="footer-block-3">
          <h5>Legals:</h5>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/sales-agreement">Sales Agreement</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
