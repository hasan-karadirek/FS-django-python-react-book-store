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
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CheckoutReturn from "./pages/CheckoutReturn";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="shop" element={<MainLayout />}>
        <Route path="books" element={<Books />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout-return" element={<CheckoutReturn />} />
        <Route path="books/:id" element={<BookPage />} />
      </Route>
      <Route path="customer" element={<MainLayout />}>
        <Route index element={<CustomerPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default App;
