import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/appoinments/`;

export const bookAppointment = async (appointmentdata) => {
  try {
    const res = await axios.post(API_URL, appointmentdata, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return res.data.appoinment;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
