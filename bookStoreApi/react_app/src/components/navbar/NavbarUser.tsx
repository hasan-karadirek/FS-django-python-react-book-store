import React, { useState } from "react";
import userIcon from "../../assets/user.png";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import LoginForm from "../customer/LoginForm";
import "../CSS/NavbarUser.css";
import { Circles } from "react-loader-spinner";

const NavbarUser: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/customer/logout/",
    () => {
      localStorage.removeItem("order");
      localStorage.removeItem("orderInProgress");
      localStorage.removeItem("customer");
      location.reload();
    },
  );

  const handleLogout = () => {
    performFetch({
      headers: {
        Authorization: Cookies.get("token")
          ? `Token ${Cookies.get("token")}`
          : "",
      },
    });

    return () => cancelFetch();
  };

  return (
    <div className="nav-user-container">
      <div
        className="d-flex"
        style={{ justifyContent: "center" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          style={{ height: "2rem", paddingLeft: "1rem" }}
          src={userIcon}
          alt="user-icon"
        />
      </div>
      {isLoading ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div
          className="nav-login-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: isHover ? "block" : "none" }}
        >
          {localStorage.getItem("customer") && Cookies.get("token") ? (
            <>
              {error ? (
                <p
                  className="error"
                  style={{ color: "rgb(191, 0, 10)", padding: "1rem" }}
                >
                  {error.message}
                </p>
              ) : (
                <Link style={{ padding: "2rem" }} to="#" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </>
          ) : (
            <LoginForm
              containerClasses="nav-login-container"
              setIsLoginForm={null}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarUser;
