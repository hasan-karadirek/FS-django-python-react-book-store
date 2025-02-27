"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/app/utils/LocalStorage";

const CookiePopUp: React.FC = () => {
  const [cookiePolicy, setCookiePolicy] = useState<boolean>(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cookieP = getLocalStorage("cookiePolicy");
    if (cookieP && cookieP === "true") {
      setCookiePolicy(JSON.parse(cookieP));
      ref.current?.classList.remove("cookie-modal-active")
      ref.current?.classList.add("cookie-modal-deactive")
    }else if(cookieP === null || cookieP == "false"){
      ref.current?.classList.remove("cookie-modal-deactive")
      ref.current?.classList.add("cookie-modal-active")
    }
  }, [cookiePolicy]);

  return  (
    <div
      className="modal cookie-modal-deactive"
      ref={ref}
      tabIndex={-1}
      style={{
        overflowX: "unset",
        overflowY: "unset",
        backgroundColor: "#0000008f",
        
      }}
    >
      <div className="modal-dialog" style={{ top: "30vh" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">We Value Your Privacy</h5>
          </div>
          <div className="modal-body">
            <p>
            Our website uses cookies to improve your experience and ensure its functionality. You can choose which cookies to allow:

            - Necessary Cookies: Essential for the website to function properly.
            - Marketing Cookies: Help us personalize content, tailor ads, and provide social media features.
            
            Please select your preference to continue using the website.{" "}
              <span>
                Read our <Link href="/cookie-policy">Cookie Policy</Link>
              </span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                setLocalStorage("cookiePolicy", "false");
                setCookiePolicy(false);
              }}
              type="button"
              className="btn btn-danger"
            >
              Use Necessary Cookies Only
            </button>
            <button
              onClick={() => {
                setLocalStorage("cookiePolicy", "true");
                setCookiePolicy(true);
              }}
              type="button"
              className="btn btn-success"
            >
              Accept Marketing Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopUp;
