import api from "./axios";

const API_URL = `/user`;

export const getUserProfile = async () => {
  const res = await api.get(`${API_URL}/profile`);
  return res.data.profile;
};

export const updateUserProfile = async (updates) => {
  const res = await api.put(`${API_URL}/profile`, updates);
  return res.data.profile;
};
