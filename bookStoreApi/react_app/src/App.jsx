import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}></Route>
    </Routes>
  );
};

export default App;
