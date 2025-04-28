import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/payments`;
const token = localStorage.getItem("token");

export const createPaymentSession = async (appointmentId) => {
  const res = await axios.post(
    `${API_URL}/appoinment-payment`,
    { appointmentId },
    {
      headers: { Authorization: token },
    }
  );
  return res.data; // returns { payment_session_id, order_id }
};

export const verifyPayment = async (orderId) => {
  const res = await axios.get(`${API_URL}/verify/${orderId}`, {
    headers: { Authorization: token },
  });
  return res.data.paymentStatus;
};
