import React, { useState } from "react";
import userIcon from "../../assets/user.png";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import LoginForm from "../customer/LoginForm";
import "../CSS/NavbarUser.css";

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

  return error ? (
    "error"
  ) : isLoading ? (
    "Loading"
  ) : (
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
      <div
        className="nav-login-dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: isHover ? "block" : "none" }}
      >
        {localStorage.getItem("customer") && Cookies.get("token") ? (
          <Link to="#" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <LoginForm containerClasses="nav-login-container" />
        )}
      </div>
    </div>
  );
};

export default NavbarUser;
