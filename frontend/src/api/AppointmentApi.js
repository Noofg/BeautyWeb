import api from "./api"; 

const API_URL = `${process.env.REACT_APP_API_URL}/api/appointments`;

export const bookAppointment = async (userId, data) => {
   
  return await api.post(`${API_URL}/book`, data,); 

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