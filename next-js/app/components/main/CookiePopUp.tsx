"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/app/utils/LocalStorage";

const CookiePopUp: React.FC = () => {
  const [cookiePolicy, setCookiePolicy] = useState<boolean>(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cookieP = getLocalStorage("cookiePolicy");
    console.log(cookieP)
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
              Our website uses cookies to ensure you get the best experience on
              our site. Cookies help us personalize content, tailor ads, and
              provide social media features. By continuing to use our site, you
              accept our use of cookies.{" "}
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
                window.location.href = "https://google.com";
              }}
              type="button"
              className="btn btn-danger"
            >
              Reject Cookies
            </button>
            <button
              onClick={() => {
                setLocalStorage("cookiePolicy", "true");
                setCookiePolicy(true);
              }}
              type="button"
              className="btn btn-success"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopUp;
