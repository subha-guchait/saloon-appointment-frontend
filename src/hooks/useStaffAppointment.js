import { useEffect, useState } from "react";
import { getStaffAppointments } from "../api/appoinmentApi";
const useStaffAppointments = (status = "Scheduled") => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const appointments = await getStaffAppointments(status);
      setAppointments(appointments);
    } catch (err) {
      setError("Failed to fetch appointments.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  return { appointments, setAppointments, loading, error };
};

export default useStaffAppointments;
