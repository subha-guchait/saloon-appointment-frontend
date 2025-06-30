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
  const res = await axios.delete(`${API_URL}/${staffId}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const getStaffsByService = async (serviceId) => {
  try {
    const res = await axios.get(`${API_URL}/service/${serviceId}`, {
      headers: { Authorization: token },
    });
    return res.data.staffs;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const createSlot = async (slotData) => {
  try {
    const res = await axios.post(`${API_URL}/slots`, slotData, {
      headers: { Authorization: token },
    });
    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.errMessage);
  }
};

export const getStaffSlots = async () => {
  try {
    const res = await axios.get(`${API_URL}/slots`, {
      headers: { Authorization: token },
    });

    return res.data.slots;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteSlot = async (slotId) => {
  try {
    const res = await axios.delete(`${API_URL}/slots/${slotId}`, {
      headers: { Authorization: token },
    });
    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const updateSlot = async (slotId, slotData) => {
  try {
    const res = await axios.put(`${API_URL}/slots/${slotId}`, slotData, {
      headers: { Authorization: token },
    });

    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
