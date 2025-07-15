import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const logIn = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data.token;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const signUp = async (name, email, phone, password, isAccepted) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      email,
      phone,
      password,
      isAccepted,
    });
    return res.data.token;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const resetPassword = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/reset-password`, { email });
    return res.data.message;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
export const verifyResetLink = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/verify-reset-link/${token}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
export const updatePassword = async (token, password) => {
  try {
    const res = await axios.patch(`${API_URL}/update-password/${token}`, {
      newPassword: password,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
