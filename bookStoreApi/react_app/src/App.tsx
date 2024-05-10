import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/shop" element={<MainLayout />}>
        <Route path="books" element={<Books  />} />
      </Route>
    </Routes>
  );
};

export default App;
