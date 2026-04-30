import axios from "axios";

const EMPLOYEE_API_URL = `${process.env.REACT_APP_API_URL}/api/employees`;

// 🔹 Lấy tất cả nhân viên
export const fetchEmployees = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(EMPLOYEE_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Lấy nhân viên theo ID
export const getEmployeeById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${EMPLOYEE_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Tạo nhân viên
export const createEmployee = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(EMPLOYEE_API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Cập nhật nhân viên
export const updateEmployee = async (id, data) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${EMPLOYEE_API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Xóa nhân viên
export const deleteEmployee = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${EMPLOYEE_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Tìm kiếm nhân viên
export const searchEmployees = async (keyword) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${EMPLOYEE_API_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { keyword }
  });
};