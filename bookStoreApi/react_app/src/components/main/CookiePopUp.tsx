import React from "react";
import { Link } from "react-router-dom";
interface CookiePopUpProps {
  setCookiePolicy: React.Dispatch<React.SetStateAction<boolean>>;
}

const CookiePopUp: React.FC<CookiePopUpProps> = ({ setCookiePolicy }) => {
  return (
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
                Read our <Link to="/cookie-policy">Cookie Policy</Link>
              </span>
            </p>
          </div>
          <div className="modal-footer">
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
