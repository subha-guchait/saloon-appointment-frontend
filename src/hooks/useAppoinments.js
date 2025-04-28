import { useEffect, useState } from "react";
import { getUserAppointments, cancelAppoionment } from "../api/appoinmentApi";

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getUserAppointments();
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointmentById = async (id) => {
    try {
      const updated = await cancelAppoionment(id);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? updated : appt))
      );
    } catch (err) {
      throw new Error("Cancel failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    setAppointments,
    loading,
    error,
    cancelAppointmentById,
  };
};

export default useAppointments;
