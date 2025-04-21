import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import BookAppointment from "./pages/bookAppoinment/BookAppoinment";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div data-theme="corporate">
      <Navbar />
      <div>
        <Toaster />
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/book"
            element={authUser ? <BookAppointment /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
