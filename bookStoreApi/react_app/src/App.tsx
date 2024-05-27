import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/main/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPage from "./pages/Book";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerPage from "./pages/Customer";

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
      <Route path="customer" element={<MainLayout />}>
        <Route index element={<CustomerPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
