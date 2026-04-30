import api from "./api";

const API_URL = `${process.env.REACT_APP_API_URL}/api/services`;

// ===== GET ALL =====
export const getServices = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// ===== CREATE =====
export const createService = async (data) => {
  const res = await api.post(`${API_URL}/create`, data);
  return res.data;
};

// ===== DELETE =====
export const deleteService = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// ===== UPDATE =====
export const updateService = async (id, data) => {
  const res = await api.put(`${API_URL}/${id}`, data);
  return res.data;
};