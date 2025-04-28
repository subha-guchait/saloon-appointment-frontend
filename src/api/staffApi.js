import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/staffs`;
const token = localStorage.getItem("token");

export const getAllStaff = async () => {
  const res = await axios.get(`${API_URL}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const createStaff = async (staffData) => {
  const res = await axios.post(`${API_URL}`, staffData, {
    headers: { Authorization: token },
  });
  console.log(res.data);
  return res.data;
};

export const deleteStaff = async (staffId) => {
  const res = await axios.delete(`${API_URL}/${staffId}`);
  return res.data;
};

export const getStaffsByService = async (serviceId) => {
  const res = await axios.get(`${API_URL}/service/${serviceId}`, {
    headers: { Authorization: token },
  });
  return res.data.staffs;
};
