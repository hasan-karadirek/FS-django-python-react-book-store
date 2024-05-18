import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPage from "./pages/Book";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="shop/books" element={<MainLayout />}>
        <Route index element={<Books />} />
        <Route path=":id" element={<BookPage />} />
      </Route>
      <Route path="shop/checkout" element={<MainLayout />}>
        <Route index element={<Checkout />} />
      </Route>
      <Route path="login" element={<MainLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
