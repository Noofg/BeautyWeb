import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import {  fetchDepartments } from '../../api/DepartmentApi';
import '../../css/admincss/Admin.css'; 
import { useModal } from '../../context/ModalContext';
import '../../css/admincss/EmployeeManagement.css'; // EmployeeManagement page specific styles
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} from "../../api/EmployeeApi";
import { fetchBranches } from '../../api/BranchApi';
function EmployeeManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [employees, setEmployees] = useState([]);
const [editingEmployee, setEditingEmployee] = useState(null);
const [departments, setDepartments] = useState([]);
const [branches, setBranches] = useState([]);
const { showModal } = useModal();


const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  position: "",
  department: "",
  salary: "",
  startDate: "",
  status: "Đang làm việc",
  branches: "",
});
const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const loadEmployees = async () => {
  try {
    const res = await fetchEmployees();
    setEmployees(res || []);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  loadEmployees();
}, []);
const handleSearch = async (value) => {
  setSearchTerm(value);

  if (!value) {
    loadEmployees();
    return;
  }

  try {
    const res = await searchEmployees(value);
    setEmployees(res.data);
  } catch (err) {
    console.error(err);
  }
};
const handleDelete = async (id) => {
  showModal({
    title: "Xác nhận xóa",
    message: "Bạn có chắc chắn muốn xóa nhân viên này không?",
    type: "warning",
    onConfirm: async () => {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (err) {
        showModal({
          title: "Lỗi",
          message: "Có lỗi xảy ra khi xóa nhân viên.",
          type: "error"
        });
      }
    }
  });
};
const handleEdit = (emp) => {
  setEditingEmployee(emp);
  setForm(emp);
  setShowCreateModal(true);
};
const handleSubmit = async () => {
  try {
    const data = {
      ...form,
      salary: Number(form.salary) 
    };
    console.log("DATA SEND:", data);
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
      showModal({
        title: "Thành công",
        message: "Cập nhật nhân viên thành công!",
        type: "success"
      });
    } else {
      await createEmployee(data);
      showModal({
        title: "Thành công",
        message: "Tạo nhân viên thành công!",
        type: "success"
      });
    }

    setShowCreateModal(false);
    setEditingEmployee(null);
    loadEmployees();
  } catch (err) {
    showModal({
      title: "Lỗi",
      message: "Có lỗi xảy ra khi cập nhật nhân viên.",
      type: "error"
    });
  }
};
// eslint-disable-next-line no-undef
useEffect(() => {
  const loadDepartments = async () => {
    try {
      const res = await fetchDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  loadDepartments();
}, []);
useEffect(() => {
  const loadBranches = async () => {
    try {
      const res = await fetchBranches();
      setBranches(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  loadBranches();
}, []);
const totalEmployees = employees.length;

const workingEmployees = employees.filter(
  (e) => e.status === "Đang làm việc"
).length;

const leaveEmployees = employees.filter(
  (e) => e.status === "Nghỉ phép"
).length;

const totalSalary = employees.reduce(
  (sum, e) => sum + (e.salary || 0),
  0
);
const totalSalaryM = (totalSalary / 1000000).toFixed(1);
  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
          <p>Hệ thống quản lý</p>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin">Tổng quan</Link></li>
          <li><Link to="/admin/users">Người dùng</Link></li>
          <li><Link to="/admin/branches">Chi nhánh</Link></li>
          <li><Link to="/admin/departments">Phòng ban</Link></li>
          <li className="active"><Link to="/admin/employees">Nhân viên</Link></li>
          <li><Link to="/admin/stats">Thống kê</Link></li>
          <li><Link to="/admin/customers">Khách hàng</Link></li>
          <li><Link to="/admin/services">Dịch vụ</Link></li>
           <li><Link to="/admin/vouchers">Voucher</Link></li>
            <li><Link to="/admin/category">Danh mục </Link></li>
          <li><Link to="/admin/products">Kho Sản Phẩm</Link></li>
          <li><Link to="/admin/reports">Báo cáo</Link></li>
          <li><Link to="/admin/settings">Cài đặt</Link></li>
          <li><Link to="/admin/logout">Đăng xuất</Link></li>
        </ul>
        <div className="sidebar-footer">
          <div className="profile-card">
            <div>
              <div className="profile-name">Admin User</div>
              <div className="profile-role">Quản lý kho</div>
            </div>
            <div className="profile-email">admin@bellebeaute.vn</div>
          </div>
        </div>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <div></div>
              <div></div>
              <div></div>
            </button>
            <div>
              <h1>Quản lý nhân viên</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý thông tin nhân viên theo từng phòng ban</p>
            </div>
          </div>
          <div className="user-info">
            <span>Admin User</span>
            <span>admin@bellebeaute.vn</span>
          </div>
        </header>

        <div className="overview-section">
          <h2>Tổng quan</h2>
          <div className="overview-stats">
            <div className="stat-item">
              <h3>Tổng nhân viên</h3>
               <p>{totalEmployees}</p>
            </div>
            <div className="stat-item">
              <h3>Đang làm việc</h3>
              <p>{workingEmployees}</p>
            </div>
            <div className="stat-item">
              <h3>Nghỉ phép</h3>
             <p>{leaveEmployees}</p>
            </div>
            <div className="stat-item">
              <h3>Tổng lương/tháng</h3>
               <p>{totalSalaryM}M</p>
            </div>
          </div>
        </div>

        <div className="employee-management-section">
          <div className="section-header">
            <h2>Nhân viên</h2>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                Thêm nhân viên
              </button>
            </div>
          </div>

          <div className="employee-table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Nhân viên</th>
                  <th>Chức vụ</th>
                  <th>Phòng ban</th>
                  <th>Liên hệ</th>
                  <th>Lương</th>
                  <th>Ngày vào</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td className="employee-info">
                      <div className="employee-name">
                        <div className="avatar">{employee.name.charAt(0)}</div>
                        <div>
                          <div className="name">{employee.name}</div>
                          <div className="id">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>
                      <div className="contact-info">
                        <div>{employee.phone}</div>
                        
                      </div>
                    </td>
                    <td className="salary">{employee.salary} VNĐ</td>
                    <td>{employee.startDate}</td>
                    <td>
                      <span className={`status ${employee.status === 'Đang làm việc' ? 'active' : 'inactive'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(employee)}>
                        Sửa
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Thêm nhân viên mới</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-grid">
              <label>
                Họ và tên *
                <input   type="text"
                    name="name"
                    value={form.name}
                    onChange={handleCreateFormChange}
                    required />
              </label>
             
              <label>
                Email *
                <input   type="text"
                    name="email"
                    value={form.email}
                    onChange={handleCreateFormChange}
                    required />
              </label>
              <label>
                Số điện thoại *
                <input   type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleCreateFormChange}
                    required />
              </label>
              <label>
                Chức vụ *
                <select name="position"
                value={form.position}
                onChange={handleCreateFormChange}>
                  <option value="">Chọn chức vụ</option>
                  <option value="Trưởng phòng">Trưởng phòng</option>
                  <option value="Nhân viên">Nhân viên</option>
                </select>
              </label>
              <label>
                Chi nhánh *
                <select name ="branches"
                  value={form.branches}
                  onChange={handleCreateFormChange}
                >
                  <option value="">Chọn chi nhánh</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Phòng ban *
                <select name="department"
                value={form.department}
                onChange={handleCreateFormChange}>
                 <option value="">Chọn phòng ban</option>
  {departments.map((dep) => (
    <option key={dep.id} value={dep.name}>
      {dep.name}
    </option>
  ))}
                </select>
              </label>
              <label>
                Lương (VNĐ) *
               <input
               type="text"
               name="salary"
              value={form.salary}
               onChange={handleCreateFormChange}
               />
              </label>
              <label>
                Ngày vào làm *
                 <input
               type="date"
               name="startDate"
               value={form.startDate}
                onChange={handleCreateFormChange}
                 />
              </label>
              <label>
                Trạng thái
                <select
                  name="status"
                  value={form.status}
                  onChange={handleCreateFormChange}
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Nghỉ phép">Nghỉ phép</option>
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setShowCreateModal(false)}>
                Hủy
              </button>
             <button className="primary-btn" onClick={handleSubmit}>
             {editingEmployee ? "Cập nhật" : "Lưu nhân viên"}
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;