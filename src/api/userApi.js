import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;
const token = localStorage.getItem("token");

export const getUserProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: token },
  });
  return res.data.profile;
};

export const updateUserProfile = async (updates) => {
  const res = await axios.put(`${API_URL}/profile`, updates, {
    headers: { Authorization: token },
  });
  return res.data.profile;
};
