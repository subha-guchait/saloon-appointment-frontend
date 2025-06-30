import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/appoinments/`;
const token = localStorage.getItem("token");

export const bookAppointment = async (slotId) => {
  try {
    const res = await axios.post(
      API_URL,
      { slotId },
      {
        headers: { Authorization: token },
      }
    );
    return res.data.appoinment;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getUserAppointments = async () => {
  try {
    const res = await axios.get(API_URL, { headers: { Authorization: token } });
    return res.data.appoinments;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const cancelAppoionment = async (appoinmentId) => {
  try {
    const res = await axios.put(
      `${API_URL}cancel/${appoinmentId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );

    return res.data.appoinment;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getStaffAppointments = async (status) => {
  try {
    const res = await axios.get(`${API_URL}/staff?status=${status}`, {
      headers: { Authorization: token },
    });
    return res.data.appoinments;
  } catch (err) {
    throw new Error(err.response.data.errMessage);
  }
};
