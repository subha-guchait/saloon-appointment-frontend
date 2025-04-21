import { useState } from "react";
import { bookAppointment } from "../api/appoinmentApi";

const useBookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBookAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookAppointment(appointmentData);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleBookAppointment, loading, error };
};

export default useBookAppointment;
