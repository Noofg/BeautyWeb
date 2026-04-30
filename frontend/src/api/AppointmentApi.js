import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/appointments`;

export const bookAppointment = (userId, data) => {
   const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/book`, data, {
    headers: {
      "X-User-Id": userId,
       Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserAppointments = (userId) => {
   const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointment = (appointmentId) => {
   const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/${appointmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelAppointment = (appointmentId) => {
   const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/${appointmentId}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllAppointments = () => {
   const token = localStorage.getItem("token");
  return axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getTodayAppointments = () => {
  const today = new Date().toISOString().split('T')[0]; // yyyy-MM-dd
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/date/${today}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};