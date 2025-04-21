import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/services`;

export const getAllServices = async () => {
  const response = await axios.get(API_URL);
  return response.data.services;
};
