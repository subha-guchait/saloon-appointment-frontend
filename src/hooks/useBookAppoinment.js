import { useState, useEffect } from "react";
import { bookAppointment } from "../api/appoinmentApi";
import { getSlots } from "../api/serviceApi";

const useBookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBookAppointment = async (slotId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookAppointment(slotId);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (serviceId, date) => {
    if (!serviceId || !date) return;
    setLoading(true);
    setError(null);
    try {
      const slots = await getSlots(serviceId, date);
      return slots;
    } catch (err) {
      console.error("Error fetching slots", err);
      setError("Failed to load slots");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { handleBookAppointment, fetchSlots, loading, error };
};

export default useBookAppointment;
