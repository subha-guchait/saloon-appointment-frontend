import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/services`;

const token = localStorage.getItem("token");

export const getAllServices = async () => {
  const response = await axios.get(API_URL);
  return response.data.services;
};
export const getAllServicesAdmin = async () => {
  const response = await axios.get(`${API_URL}/all-services`, {
    headers: { Authorization: token },
  });
  return response.data.services;
};

export const createService = async (serviceData) => {
  const res = await axios.post(API_URL, serviceData, {
    headers: { Authorization: token },
  });
  return res.data.service;
};

export const updateService = async (serviceId, serviceData) => {
  const res = await axios.put(`${API_URL}/${serviceId}`, serviceData, {
    headers: { Authorization: token },
  });
  return res.data.service;
};
export const updateServiceStatus = async (serviceId, isActive) => {
  const res = await axios.patch(
    `${API_URL}/${serviceId}`,
    { isActive },
    {
      headers: { Authorization: token },
    }
  );
  return res.data.service;
};
export const deleteService = async (serviceData) => {
  const res = await axios.post(API_URL, serviceData, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const getSlots = async (serviceId, date) => {
  try {
    const res = await axios.get(`${API_URL}/${serviceId}/slots?date=${date}`, {
      headers: { Authorization: token },
    });
    return res.data.availableSlots;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
