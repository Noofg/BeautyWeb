import api from "./api";

const API_URL = `${process.env.REACT_APP_API_URL}/api/vouchers`;

// ================= CREATE =================
export const createVoucher = async (data) => {
  const res = await api.post(`${API_URL}/create`, data);
  return res.data;
};

// ================= GET ALL =================
export const getAllVouchers = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// ================= GET BY ID =================
export const getVoucherById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

// ================= UPDATE =================
export const updateVoucher = async (id, data) => {
  const res = await api.put(`${API_URL}/${id}`, data);
  return res.data;
};

// ================= DELETE =================
export const deleteVoucher = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// ================= APPLY =================
export const applyVoucher = async (code, amount, customerType) => {
  const res = await api.post(
    `${API_URL}/apply?code=${code}&amount=${amount}&customerType=${customerType}`,
    {}
  );
  return res.data;
};