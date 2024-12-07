'use client';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import Link from "next/link";
import LoginForm from "../customer/LoginForm";
import { Circles } from "react-loader-spinner";
import { NextRouter, useRouter } from "next/router";

const NavbarUser: React.FC = () => {
  const [customer, setCustomer] = useState<boolean>(
    
  );




  useEffect(() => {
    
    const customer = localStorage.getItem("customer");
    if (customer) {
      setCustomer(true);
    }
  }, []);
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
          id="navbar-user-icon"
          src="assets/user.png"
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
          style={{
            display: isHover ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {customer && Cookies.get("token") ? (
            <>
              {error ? (
                <p
                  className="error"
                  style={{ color: "rgb(191, 0, 10)", padding: "1rem" }}
                >
                  {error.message}
                </p>
              ) : (
                <>
                  <Link style={{ padding: "1rem" }} href="/customer">
                    Dashboard
                  </Link>
                  <Link
                    style={{ padding: "1rem" }}
                    href="#"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </>
              )}
            </>
          ) : (
            <p>Customer</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarUser;
