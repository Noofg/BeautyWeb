import api from "./api";

const API_URL = `${process.env.REACT_APP_API_URL}/api/categories`;

// ===== GET ALL =====
export const getCategories = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// ===== CREATE =====
export const createCategory = async (data) => {
  const res = await api.post(API_URL, data);
  return res.data;
};

// ===== UPDATE =====
export const updateCategory = async (id, data) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update category error:", err);
    throw err;
  }
};

// ===== DELETE =====
export const deleteCategory = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};