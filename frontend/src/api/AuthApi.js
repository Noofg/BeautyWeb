import axios from "axios";
import api from "./api";
const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;


// Helper function to extract role as string
export const getRoleString = (role) => {
  if (!role) return 'CUSTOMER';
  if (typeof role === 'string') return role.toUpperCase();
  if (role.toString) return role.toString().toUpperCase();
  return 'CUSTOMER';
};
export const fetchUsers = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const registerUser = (data) => {
  return axios.post(`${API_URL}/registerCustomer`, data);
};
export const adminRegisterUser = (data) => {
 return axios.post(`${API_URL}/adminRegisterCustomer`, data);
};
export const loginUser = (data) => {
    const res = await axios.post(`${API_URL}/login`, data);

  const token = res.data.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  return res;
};
export const logout = () => {
  localStorage.removeItem("token");
};


