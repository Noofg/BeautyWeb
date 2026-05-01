import api from "./api";

const DEPARTMENT_API_URL = `${process.env.REACT_APP_API_URL}/api/departments`;

// 🔹 Lấy danh sách phòng ban
export const fetchDepartments = async () => {
  return await api.get(DEPARTMENT_API_URL);
  
};

// 🔹 Tạo phòng ban
export const createDepartment = async (departmentData) => {
  const res = await api.post(DEPARTMENT_API_URL, departmentData);
  return res.data;
};

// 🔹 Cập nhật phòng ban
export const updateDepartment = async (id, departmentData) => {
  const res = await api.put(`${DEPARTMENT_API_URL}/${id}`, departmentData);
  return res.data;
};

// 🔹 Xóa phòng ban
export const deleteDepartment = async (id) => {
  const res = await api.delete(`${DEPARTMENT_API_URL}/${id}`);
  return res.data;
};

// 🔹 Tìm kiếm phòng ban
export const searchDepartments = async (keyword) => {
  const res = await api.get(`${DEPARTMENT_API_URL}/search?keyword=${keyword}`);
  return res.data;
};