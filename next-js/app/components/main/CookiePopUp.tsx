"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const CookiePopUp: React.FC = () => {
  const [cookiePolicy, setCookiePolicy] = useState<boolean>(false);
  if (typeof window == "undefined"){
    throw new Error("This environment is not available for client-side rendering.")
  }
  useEffect(() => {
    const cookieP = localStorage.getItem("cookiePolicy");
    if (cookieP) {
      setCookiePolicy(JSON.parse(cookieP));
    }
  }, [cookiePolicy]);

  return cookiePolicy ? (
    ""
  ) : (
    <div
      className="modal"
      tabIndex={-1}
      style={{
        overflowX: "unset",
        overflowY: "unset",
        display: "block",
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
                localStorage.setItem("cookiePolicy", "false");
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
                localStorage.setItem("cookiePolicy", "true");
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
