import api from "./api";

const API_URL = `${process.env.REACT_APP_API_URL}/api/products`;

// ===== HELPER normalize _id → id =====
const normalize = (data) => {
  return data.map(p => ({
    ...p,
    id: p._id
  }));
};

// ================= GET ALL =================
export const getProducts = async () => {
  const res = await api.get(API_URL);
  return normalize(res.data);
};

// ================= GET BY ID =================
export const getProductById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return { ...res.data, id: res.data._id };
};

// ================= CREATE =================
export const createProduct = async (data) => {
  const res = await api.post(API_URL, data);
  return res.data;
};

// ================= UPDATE =================
export const updateProduct = async (id, data) => {
  const res = await api.put(`${API_URL}/${id}`, data);
  return res.data;
};

// ================= DELETE =================
export const deleteProduct = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// ================= SEARCH =================
export const searchProducts = async (keyword) => {
  const res = await api.get(`${API_URL}/search`, {
    params: { keyword }
  });
  return normalize(res.data);
};

// ================= FILTER CATEGORY =================
export const getProductsByCategory = async (categoryId) => {
  const res = await api.get(`${API_URL}/category/${categoryId}`);
  return normalize(res.data);
};

// ================= LOW STOCK =================
export const getLowStockProducts = async (threshold = 10) => {
  const res = await api.get(`${API_URL}/low-stock`, {
    params: { threshold }
  });
  return normalize(res.data);
};

// ================= EXPIRED =================
export const getExpiredProducts = async () => {
  const res = await api.get(`${API_URL}/expired`);
  return normalize(res.data);
};

// ================= EXPIRING SOON =================
export const getExpiringSoonProducts = async (days = 7) => {
  const res = await api.get(`${API_URL}/expiring-soon`, {
    params: { days }
  });
  return normalize(res.data);
};

// ================= TOTAL VALUE =================
export const getTotalValue = async () => {
  const res = await api.get(`${API_URL}/total-value`);
  return res.data;
};