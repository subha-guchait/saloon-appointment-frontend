import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/appoinments`;
const token = localStorage.getItem("token");

export const fetchScheduledAppointments = async () => {
  const res = await axios.get(`${API_URL}/admin`, {
    headers: { Authorization: token },
  });
  return res.data.appoinments;
};

export const assignStaffToAppointment = async (appointmentId, staffId) => {
  const res = await axios.put(
    `${API_URL}/assign/${appointmentId}`,
    {
      staffId,
    },
    { headers: { Authorization: token } }
  );
  return res.data.appoinment;
};

export const completeAppointment = async (appointmentId) => {
  const res = await axios.put(
    `${API_URL}/complete/admin/${appointmentId}`,
    { appointmentId },
    {
      headers: { Authorization: token },
    }
  );
  return res.data.appoinment;
};
