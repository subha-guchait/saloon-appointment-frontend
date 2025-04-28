import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import BookAppointment from "./pages/bookAppoinment/BookAppoinment";
import ViewAppointments from "./pages/viewAppoinment/ViewAppoinment";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useAuthContext } from "./context/AuthContext";
import UserRoute from "./components/routes/userRoute";
import AdminRoute from "./components/routes/adminRoute";
import StaffPage from "./pages/staff/StaffPage";
import ManageAppointmentsPage from "./pages/ManageAppointments/ManageAppointmentsPage";

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
            element={
              <UserRoute>
                <BookAppointment />
              </UserRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <UserRoute>
                <ViewAppointments />
              </UserRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <AdminRoute>
                <StaffPage />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-appointments"
            element={
              <AdminRoute>
                <ManageAppointmentsPage />
              </AdminRoute>
            }
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
