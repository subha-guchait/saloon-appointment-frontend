import api from "./axios";

const API_URL = `/services`;

export const getAllServices = async () => {
  const response = await api.get(API_URL);
  return response.data.services;
};
export const getAllServicesAdmin = async () => {
  const response = await api.get(`${API_URL}/all-services`);
  return response.data.services;
};

export const createService = async (serviceData) => {
  const res = await api.post(API_URL, serviceData);
  return res.data.service;
};

export const updateService = async (serviceId, serviceData) => {
  const res = await api.put(`${API_URL}/${serviceId}`, serviceData);
  return res.data.service;
};
export const updateServiceStatus = async (serviceId, isActive) => {
  const res = await api.patch(`${API_URL}/${serviceId}`, { isActive });
  return res.data.service;
};
export const deleteService = async (serviceData) => {
  const res = await api.post(API_URL, serviceData);
  return res.data;
};

export const getSlots = async (serviceId, date) => {
  try {
    const res = await api.get(`${API_URL}/${serviceId}/slots?date=${date}`);
    return res.data.availableSlots;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
