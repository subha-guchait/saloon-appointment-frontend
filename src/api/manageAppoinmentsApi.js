import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/appoinments`;
const token = localStorage.getItem("token");

export const fetchAppointments = async (status, page, limit) => {
  const res = await axios.get(
    `${API_URL}/admin?status=${status}&page=${page}&limit=${limit}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
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
  try {
    const res = await axios.put(
      `${API_URL}/complete/${appointmentId}`,
      { appointmentId },
      {
        headers: { Authorization: token },
      }
    );
    return res.data.appoinment;
  } catch (err) {
    throw new Error(
      err.response.data.errMessage || "Failed to complete appointment"
    );
  }
};
