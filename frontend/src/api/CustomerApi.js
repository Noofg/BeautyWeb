import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/customers`;

// Lấy tất cả khách hàng
export const getCustomers = () => {
  const token = localStorage.getItem("token");
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Lấy customer theo userId (🔥 quan trọng để lấy điểm)
export const getCustomerByUserId = (userId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Tạo customer
export const createCustomer = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getCustomerAll = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
// Cập nhật customer
export const updateCustomer = (id, data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Xóa customer
export const deleteCustomer = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Tìm kiếm customer
export const searchCustomers = (keyword) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/search?keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const CustomerPointsApi  = (userId, points) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/use-points/${userId}?points=${points}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};