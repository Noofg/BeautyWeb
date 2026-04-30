import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import  '../../css/admincss/Admin.css'; 
import {useModal } from '../../context/ModalContext';
import '../../css/admincss/DepartmentManagement.css'; 
import { createDepartment,deleteDepartment, fetchDepartments,updateDepartment,searchDepartments } from '../../api/DepartmentApi';

function DepartmentManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const { showModal } = useModal();
const [createForm, setCreateForm] = useState({
    name: '',
    departmentHead: '',
    budget: '',
    status: 'Hoạt động',
    description: ''
  });
   const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

    // load data
  const loadDepartments = async () => {
    try {
      const res = await fetchDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  fetchDepartments()
    .then(res => setDepartments(res.data))
    .catch(err => console.error(err));
}, []);

 // delete
  const handleDelete = async (id) => {
    showModal({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa phòng ban này không?",
      type: "warning",
      onConfirm: async () => {
        try {
          await deleteDepartment(id);
          loadDepartments();
        } catch (err) {
          showModal({
            title: "Lỗi",
            message: "Có lỗi xảy ra khi xóa phòng ban.",
            type: "error"
          });
        }
      }
    });
  };
const handleUpdate = async () => {
  try {
    const updateData = {
    
      name: createForm.name,
      departmentHead: createForm.departmentHead,
      budget: createForm.budget,
      description: createForm.description,
       state: "Hoạt động"
    };

    await updateDepartment(editingDepartment.id, updateData);

    showModal({
      title: "Thành công",
      message: "Cập nhật phòng ban thành công!",
      type: "success"
    });

    setShowCreateModal(false);
    setEditingDepartment(null);
    loadDepartments();
  } catch (err) {
    showModal({
      title: "Lỗi",
      message: "Có lỗi xảy ra khi cập nhật phòng ban.",
      type: "error"
    });
  }
};

const handleSearch = async (keyword) => {
  if (!keyword) {
    loadDepartments();
    return;
  }

  try {
    const res = await searchDepartments(keyword);
    setDepartments(res.data);
  } catch (err) {
    console.error(err);
  }
};

const handleEdit = (dep) => {
  setEditingDepartment(dep);

  setCreateForm({
    name: dep.name,
    departmentHead: dep.departmentHead,
    budget: dep.budget,
    description: dep.description
  });

  setShowCreateModal(true);
};


const handleCreateDepartment = async (e) => {
    e.preventDefault();

    if (!createForm.name || !createForm.departmentHead || !createForm.budget || !createForm.description) {
      showModal({
        title: "Thiếu thông tin",
        message: "Vui lòng nhập đầy đủ thông tin bắt buộc!",
        type: "warning"
      });
      return;
    }
    try {
      const userData = {
        name: createForm.name,
        departmentHead: createForm.departmentHead,
        budget:Number(createForm.budget),
        status: createForm.status,
        description:createForm.description
      };
      await createDepartment(userData)
       showModal({
        title: "Thành công",
        message: "Tạo phòng ban thành công!",
        type: "success"
      });
        setShowCreateModal(false);
        const response = await fetchDepartments();
              setDepartments(response.data || []);
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo phòng ban!');
    }
  };
  
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
          <li className="active"><Link to="/admin/departments">Phòng ban</Link></li>
          <li><Link to="/admin/employees">Nhân viên</Link></li>
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
              <h1>Quản lý phòng ban</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý thông tin các phòng ban trong thẩm mỹ viện</p>
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
              <h3>Tổng phòng ban</h3>
              <p>5</p>
            </div>
            <div className="stat-item">
              <h3>Tổng nhân viên</h3>
              <p>29</p>
            </div>
            
            <div className="stat-item">
              <h3>Chi nhánh</h3>
              <p>4</p>
            </div>
           
            <div className="stat-item">
              <h3>TB nhân viên/PB</h3>
              <p>6</p>
            </div>
            <div className="stat-item">
              <h3>Nhân viên</h3>
              <p>29</p>
            </div>
            
          </div>
        </div>

        <div className="department-management-section">
          <div className="section-header">
            <h2>Phòng ban</h2>
            <div className="actions">
             <input
             type="text"
  placeholder="Tìm kiếm phòng ban..."
  className="search-input"
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  }}
            />
              <button
              className="create-btn"
             onClick={() => {
             setEditingDepartment(null);
            setCreateForm({
          name: '',
          departmentHead: '',
          budget: '',
          description: ''
          });
            setShowCreateModal(true);
             }}
>
          Thêm phòng ban
         </button>
            </div>
          </div>

          <div className="department-grid">
          {departments.length > 0 ? (
          departments.map((dep) => (
      <div className="department-card" key={dep.id}>
        <div className="department-header">
          <h3>{dep.name}</h3>
          <span className="status active">Hoạt động</span>
        </div>

        <div className="department-info">
          <p><strong>Trưởng phòng:</strong> {dep.departmentHead}</p>
          <p><strong>Mô tả:</strong> {dep.description}</p>
        </div>

        <div className="department-budget">
          <div className="budget-label">Ngân sách tháng</div>
          <div className="budget-value">{dep.budget || 0} VNĐ</div>
        </div>

        <div className="department-actions">
           <button className="edit-btn" onClick={() => handleEdit(dep)}>
          Sửa
        </button>
        <button className="delete-btn" onClick={() => handleDelete(dep.id)}>
          Xóa
        </button>
        </div>
      </div>
    ))
  ) : (
    <p>Chưa có phòng ban nào</p>
  )}
</div>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Thêm phòng ban mới</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-grid">
              <label>
                Tên phòng ban *
                <input   type="text"
                    name="name"
                    value={createForm.name}
                    onChange={handleCreateFormChange}
                    required />
              </label>
              <label>
                Trưởng phòng *
                <input   type="text"
                    name="departmentHead"
                    value={createForm.departmentHead}
                    onChange={handleCreateFormChange}
                    required />
              </label>
              <label>
                Số nhân viên
                <input   type="number"
                    name="employeeCount"
                    value={createForm.employeeCount}
                    onChange={handleCreateFormChange} />
              </label>
              <label>
                Ngân sách tháng (VNĐ) *
                <input   type="text"
                    name="budget"
                    value={createForm.budget}
                    onChange={handleCreateFormChange}
                    required />
              </label>
            </div>
            <div className="modal-textarea">
              <label>
                Mô tả phòng ban *
                <textarea 
                  name="description"
                  value={createForm.description}
                  onChange={handleCreateFormChange}
                  rows="4" 
                  placeholder="Mô tả chi tiết về chức năng và nhiệm vụ của phòng ban..."
                ></textarea>
              </label>
            </div>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setShowCreateModal(false)}>
                Hủy
              </button>
             <button
             className="primary-btn"
             onClick={editingDepartment ? handleUpdate : handleCreateDepartment}
             >
              {editingDepartment ? "Cập nhật" : "Lưu phòng ban"}
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentManagement;