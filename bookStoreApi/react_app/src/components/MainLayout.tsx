import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout : React.FC = () => {
  return <div className="container">
    <Navbar/>
    <Outlet/>
     <h1>Hello from bookstore</h1></div>;
};
export default MainLayout;
