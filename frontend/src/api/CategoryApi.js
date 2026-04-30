import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/categories`;

// ===== GET ALL =====
export const getCategories = () => {
  const token = localStorage.getItem("token");
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ===== CREATE =====
export const createCategory = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const updateCategory = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("Update category error:", err);
    throw err;
  }
};
// ===== DELETE =====
export const deleteCategory = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};