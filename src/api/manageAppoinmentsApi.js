import api from "./axios";

export const fetchAppointments = async (status, page, limit) => {
  try {
    const res = await api.get(
      `appoinments/admin?status=${status}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    throw new Error(
      err.response.data.message || "Failed to fetch appointments"
    );
  }
};

export const completeAppointment = async (appointmentId) => {
  try {
    const res = await api.put(`appoinments/complete/${appointmentId}`, {
      appointmentId,
    });
    return res.data.appoinment;
  } catch (err) {}
};
