import api from "./axios";

const API_URL = `/staffs`;

export const getAllStaff = async () => {
  const res = await api.get(`${API_URL}`);
  return res.data;
};

export const createStaff = async (staffData) => {
  const res = await api.post(`${API_URL}`, staffData);
  console.log(res.data);
  return res.data;
};

export const deleteStaff = async (staffId) => {
  const res = await api.delete(`${API_URL}/${staffId}`);
  return res.data;
};

export const getStaffsByService = async (serviceId) => {
  try {
    const res = await api.get(`${API_URL}/service/${serviceId}`);
    return res.data.staffs;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const createSlot = async (slotData) => {
  try {
    const res = await api.post(`${API_URL}/slots`, slotData);
    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.errMessage);
  }
};

export const getStaffSlots = async () => {
  try {
    const res = await api.get(`${API_URL}/slots`);

    return res.data.slots;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteSlot = async (slotId) => {
  try {
    const res = await api.delete(`${API_URL}/slots/${slotId}`);
    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const updateSlot = async (slotId, slotData) => {
  try {
    const res = await api.put(`${API_URL}/slots/${slotId}`, slotData);

    return res.data.slot;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
