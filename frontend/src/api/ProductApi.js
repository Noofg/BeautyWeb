import axios from "axios";

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
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Get products error:", err);
    throw err;
  }
};

// ================= GET BY ID =================
export const getProductById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { ...res.data, id: res.data._id };
  } catch (err) {
    console.error("Get product by id error:", err);
    throw err;
  }
};

// ================= CREATE =================
export const createProduct = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("Create product error:", err);
    throw err;
  }
};

// ================= UPDATE =================
export const updateProduct = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("Update product error:", err);
    throw err;
  }
};

// ================= DELETE =================
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  try {
    return await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Delete product error:", err);
    throw err;
  }
};

// ================= SEARCH =================
export const searchProducts = async (keyword) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { keyword }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Search product error:", err);
    throw err;
  }
};

// ================= FILTER CATEGORY =================
export const getProductsByCategory = async (categoryId) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Filter category error:", err);
    throw err;
  }
};

// ================= LOW STOCK =================
export const getLowStockProducts = async (threshold = 10) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/low-stock`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { threshold }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Low stock error:", err);
    throw err;
  }
};

// ================= EXPIRED =================
export const getExpiredProducts = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/expired`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Expired product error:", err);
    throw err;
  }
};

// ================= EXPIRING SOON =================
export const getExpiringSoonProducts = async (days = 7) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/expiring-soon`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { days }
    });
    return normalize(res.data);
  } catch (err) {
    console.error("Expiring soon error:", err);
    throw err;
  }
};

// ================= TOTAL VALUE =================
export const getTotalValue = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/total-value`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("Total value error:", err);
    throw err;
  }
};