import axios from "axios";

const DEPARTMENT_API_URL = `${process.env.REACT_APP_API_URL}/api/departments`;

// 🔹 Lấy danh sách phòng ban
export const fetchDepartments = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(DEPARTMENT_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Tạo phòng ban
export const createDepartment = async (departmentData) => {
  const token = localStorage.getItem("token");
  return await axios.post(DEPARTMENT_API_URL, departmentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const updateDepartment = async (id, departmentData) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${DEPARTMENT_API_URL}/${id}`, departmentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// 🔹 Xóa phòng ban
export const deleteDepartment = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${DEPARTMENT_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const searchDepartments = async (keyword) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${DEPARTMENT_API_URL}/search?keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};