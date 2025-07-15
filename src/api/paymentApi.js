import api from "./axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/payments`;
const token = localStorage.getItem("token");

export const createPaymentSession = async (appointmentId) => {
  const res = await api.post(`${API_URL}/appoinment-payment`, {
    appointmentId,
  });
  return res.data; // returns { payment_session_id, order_id }
};

export const verifyPayment = async (orderId) => {
  const res = await api.get(`${API_URL}/verify/${orderId}`);
  return res.data.paymentStatus;
};
