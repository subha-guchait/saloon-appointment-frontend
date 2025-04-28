import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/services`;

const token = localStorage.getItem("token");

export const getAllServices = async () => {
  const response = await axios.get(API_URL);
  return response.data.services;
};

export const createService = async (serviceData) => {
  const res = await axios.post(API_URL, serviceData, {
    headers: { Authorization: token },
  });
  return res.data;
};
