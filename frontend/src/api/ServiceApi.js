import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/services`;
export const getServices = async () => {
  return await axios.get(API_URL, )
};
export const createService = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const deleteService = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const updateService = async (id, data) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};