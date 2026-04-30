import api from "./api";

const API_URL = `${process.env.REACT_APP_API_URL}/api/customers`;

// ===== GET ALL =====
export const getCustomers = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// ===== GET BY USER ID =====
export const getCustomerByUserId = async (userId) => {
  const res = await api.get(`${API_URL}/profile/${userId}`);
  return res.data;
};

// ===== CREATE =====
export const createCustomer = async (data) => {
  const res = await api.post(`${API_URL}/create`, data);
  return res.data;
};

// ===== GET ALL (duplicate - giữ 1 thôi) =====
export const getCustomerAll = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// ===== UPDATE =====
export const updateCustomer = async (id, data) => {
  const res = await api.put(`${API_URL}/${id}`, data);
  return res.data;
};

// ===== DELETE =====
export const deleteCustomer = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// ===== SEARCH =====
export const searchCustomers = async (keyword) => {
  const res = await api.get(`${API_URL}/search?keyword=${keyword}`);
  return res.data;
};

// ===== USE POINTS =====
export const CustomerPointsApi = async (userId, points) => {
  const res = await api.put(
    `${API_URL}/use-points/${userId}?points=${points}`,
    {}
  );
  return res.data;
};