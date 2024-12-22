"use client";
import { getLocalStorage, removeLocalStorage } from "@/app/utils/LocalStorage";
import React from "react";
import Cookies from "js-cookie";

const DashboardWelcome: React.FC = () => {

    return <div
    className="container"
    style={{ fontSize: "1.25rem", marginTop: "1rem" }}
  >{`Dear ${JSON.parse(getLocalStorage("customer") ?? "null")?.first_name},`} <button className="btn btn-danger"  onClick={()=>{
    Cookies.remove("token")
    removeLocalStorage("customer")
    window.location.reload()
  }}>Logout</button></div>
}

export default DashboardWelcome