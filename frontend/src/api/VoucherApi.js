import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/vouchers`;;

// ================= CREATE =================
export const createVoucher = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ================= GET ALL =================
export const getAllVouchers = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ================= GET BY ID =================
export const getVoucherById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ================= UPDATE =================
export const updateVoucher = async (id, data) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ================= DELETE =================
export const deleteVoucher = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ================= APPLY =================
export const applyVoucher = async (code, amount, customerType) => {
  const token = localStorage.getItem("token");
  return await axios.post(
    `${API_URL}/apply?code=${code}&amount=${amount}&customerType=${customerType}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};