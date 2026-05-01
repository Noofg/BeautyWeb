import api from "./api"; 
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/appointments`;

export const bookAppointment = async (userId, data) => {
  const token = localStorage.getItem("token");

  return await api.post(`/api/appointments/book`, data, {
    headers: {
      "X-User-Id": userId,
      Authorization: `Bearer ${token}`
    }
  });
};


export const getUserAppointments = async (userId) => {
  return await api.get(`${API_URL}/user/${userId}`); 
    
};

export const getAppointment = async (appointmentId) => {
  
  return await api.get(`${API_URL}/${appointmentId}`) ;
};

export const cancelAppointment = async (appointmentId) => {
  
  return await api.put(`${API_URL}/${appointmentId}/cancel`, null);
};
export const getAllAppointments = async () => {
   
  return await api.get(`${API_URL}`);
};
export const getTodayAppointments = async () => {
  const today = new Date().toISOString().split('T')[0]; // yyyy-MM-dd
  return await api.get(`${API_URL}/date/${today}`);
};