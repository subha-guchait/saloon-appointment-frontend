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
import StaffRoute from "./components/routes/StaffRoute";
import StaffPage from "./pages/staff/StaffPage";
import ServiceManagement from "./pages/service/ServiceManagement";
import ManageAppointmentsPage from "./pages/ManageAppointments/ManageAppointmentsPage";
import VerifyPayment from "./pages/payment/VerifyPayment";
import AvailabilityPage from "./pages/StaffPages/AvailabilityPage";
import StaffAppointments from "./pages/StaffPages/StaffAppointment";

const App = () => {
  const { authUser } = useAuthContext();
  const getThemeForRole = (role) => {
    switch (role) {
      case "admin":
        return "abyss";
      case "staff":
        return "lemonade";
      case "customer":
        return "corporate";
      default:
        return "light";
    }
  };

  const theme = getThemeForRole(authUser?.role);
  return (
    <div data-theme={theme}>
      <Navbar />
      <div>
        <Toaster />
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/book-appointment"
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
            path="/admin/manage-services"
            element={
              <AdminRoute>
                <ServiceManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <AdminRoute>
                <StaffPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <AdminRoute>
                <ManageAppointmentsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/staff/availability"
            element={
              <StaffRoute>
                <AvailabilityPage />
              </StaffRoute>
            }
          />
          <Route
            path="/staff/appointments"
            element={
              <StaffRoute>
                <StaffAppointments />
              </StaffRoute>
            }
          />
          <Route
            path="/login"
            element={
              authUser ? (
                authUser.role === "admin" ? (
                  <Navigate to="/admin/manage-services" />
                ) : authUser.role === "staff" ? (
                  <Navigate to="/staff/appointments" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/verify-payment" element={<VerifyPayment />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
