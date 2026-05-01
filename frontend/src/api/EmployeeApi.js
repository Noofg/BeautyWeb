import api from "./api";

const EMPLOYEE_API_URL = `${process.env.REACT_APP_API_URL}/api/employees`;

// 🔹 Lấy tất cả nhân viên
export const fetchEmployees = async () => {
  const res = await api.get(EMPLOYEE_API_URL);
  return res.data;
};

// 🔹 Lấy nhân viên theo ID
export const getEmployeeById = async (id) => {
  return  await api.get(`${EMPLOYEE_API_URL}/${id}`);
 
};

// 🔹 Tạo nhân viên
export const createEmployee = async (data) => {
  const res = await api.post(EMPLOYEE_API_URL, data);
  return res.data;
};

// 🔹 Cập nhật nhân viên
export const updateEmployee = async (id, data) => {
  const res = await api.put(`${EMPLOYEE_API_URL}/${id}`, data);
  return res.data;
};

// 🔹 Xóa nhân viên
export const deleteEmployee = async (id) => {
  const res = await api.delete(`${EMPLOYEE_API_URL}/${id}`);
  return res.data;
};

// 🔹 Tìm kiếm nhân viên
export const searchEmployees = async (keyword) => {
  const res = await api.get(`${EMPLOYEE_API_URL}/search`, {
    params: { keyword }
  });
  return res.data;
};