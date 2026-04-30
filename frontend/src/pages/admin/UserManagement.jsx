import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, getRoleString, adminRegisterUser } from '../../api/AuthApi';
import '../../css/admincss/Admin.css'; // Common admin styles
import '../../css/admincss/UserManagement.css'; // UserManagement page specific styles
import { fetchBranches } from "../../api/BranchApi";
import { useModal } from "../../context/ModalContext";

function UserManagement() {
   const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { showModal } = useModal();
  const [error, setError] = useState('');
  const [branches, setBranches] = useState([]);
  const totalUsers = users.length;
  //  const activeUsers = users.filter(u => u.status === "ACTIVE").length;
   const lockedUsers = users.filter(u => u.status === "LOCKED").length;

   const adminCount = users.filter(u => u.role === "ADMIN").length;
   const staffCount = users.filter(u => u.role === "STAFF").length;
   const customerCount = users.filter(u => u.role === "CUSTOMER").length;
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "STAFF",
  branchId: ""
});
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};
// getListBranches 
 useEffect(() => {
  if (showCreateModal) {
    fetchBranches()
      .then(res => {
        setBranches(res.data); // axios trả về data ở đây
      })
      .catch(err => console.error(err));
  }
}, [showCreateModal]);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        const userData = (response.data || []).map(user => ({
          ...user,
          roleString: getRoleString(user.role)
        }));
        setUsers(userData);
        setLoading(false);
      })
      .catch(() => {
        setError('Không tải được danh sách tài khoản từ backend. Hiển thị danh sách mẫu.');
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      (user.name || '').toLowerCase().includes(term) ||
      (user.email || '').toLowerCase().includes(term) ||
      (user.phone || '').toLowerCase().includes(term) ||
      (user.roleString || '').toLowerCase().includes(term)
    );
  });
  const handleSave = async () => {
  // validate cơ bản
  if (!form.name || !form.email || !form.password) {
    showModal({
      title: "Lỗi",
      message: "Vui lòng nhập đầy đủ thông tin.",
      type: "error"
    });
    return;
  }

  if (!form.role) {
    showModal({
      title: "Lỗi",
      message: "Vui lòng chọn vai trò!",
      type: "error"
    });
    return;
  }

  if (!form.branchId) {
    showModal({
      title: "Lỗi",
      message: "Vui lòng chọn chi nhánh!",
      type: "error"
    });
    return;
  }

  try {
    await adminRegisterUser({
           name: form.name,
           email: form.email,
           phone: form.phone,
           role: form.role,
           branches: [form.branchId],
           password: form.password,
         });
    showModal({
      title: "Thành công",
      message: "Tạo tài khoản thành công!",
      type: "success"
    });

    setShowCreateModal(false);

  } catch (error) {
    console.error(error);

    // hiển thị lỗi backend
    if (error.response) {
      showModal({
        title: "Lỗi",
        message: error.response.data.message || "Lỗi tạo tài khoản!",
        type: "error"
      });
    } else {
      showModal({
        title: "Lỗi",
        message: "Không kết nối được server!",
        type: "error"
      });
    }
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
          <li className="active"><Link to="/admin/users">Người dùng</Link></li>
          <li><Link to="/admin/branches">Chi nhánh</Link></li>
          <li><Link to="/admin/departments">Phòng ban</Link></li>
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
              <h1>Quản lý người dùng</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý tài khoản và phân quyền hệ thống</p>
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
               <h3>Tổng người dùng</h3>
              <p>{totalUsers}</p>
            </div>
            <div className="stat-item">
              <h3>Đang hoạt động</h3>
              <p>5</p>
            </div>
            <div className="stat-item">
                <h3>Tài khoản bị khóa</h3>
               <p>{lockedUsers}</p>
            </div>
            <div className="stat-item">
               <h3>Quản trị viên</h3>
             <p>{adminCount}</p>
            </div>
            <div className="stat-item">
               <h3>Nhân viên</h3>
              <p>{staffCount}</p>
            </div>
            <div className="stat-item">
              <h3>Khách hàng</h3>
             <p>{customerCount}</p>
            </div>
          
            
          </div>
        </div>

        <div className="user-management-section">
          <div className="section-header">
            <h2>Người dùng</h2>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                Tạo tài khoản
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-text">Đang tải danh sách tài khoản...</div>
          ) : (
            <>
              {error && <div className="error-text">{error}</div>}
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Vai trò</th>
                    <th>Liên hệ</th>
                    <th>Chi nhánh</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info-cell">
                            <span className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                            <div>
                              <div>{user.name || 'Không rõ'}</div>
                              <div className="muted-text">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className={`badge ${(user.role || 'customer').toLowerCase()}`}>{user.role || 'CUSTOMER'}</span></td>
                        <td>{user.phone || '-'}</td>
                        <td>Tất cả</td>
                        <td><span className="status active">Hoạt động</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Không có tài khoản phù hợp.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Tạo tài khoản mới</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-grid">
              <label>
                Họ và tên *
                 <input 
    type="text" 
    name="name"
    value={form.name}
    onChange={handleChange}
  />
              </label>
              <label>
                Email *
                <input 
    type="email" 
    name="email"
    value={form.email}
    onChange={handleChange}
  />
              </label>
              <label>
                Số điện thoại *
                <input 
    type="text" 
    name="phone"
    value={form.phone}
    onChange={handleChange}
  />
              </label>
              <label>
                Vai trò *
               <select name="role" value={form.role} onChange={handleChange}>
               <option value="ADMIN">Admin</option>
               <option value="STAFF">Staff</option>
               <option value="DOCTOR">Doctor</option>
              </select>
              </label>
              <label>
                Chi nhánh *
               <select name="branchId" value={form.branchId} onChange={handleChange}>
               <option value="">-- Chọn chi nhánh --</option>
               {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
              {branch.name}
             </option>
                ))}
             </select>
              </label>
              <label>
                Mật khẩu *
                <input 
    type="password" 
    name="password"
    value={form.password}
    onChange={handleChange}
  />
              </label>
            </div>
            <div className="role-hint">
              <strong>Quyền hạn theo vai trò:</strong>
              <ul>
                <li>Admin: Toàn quyền hệ thống</li>
                <li>Quản lý: Quản lý chi nhánh được phân công</li>
                <li>Lễ tân: Đặt lịch, quản lý khách hàng</li>
                <li>Bác sĩ: Xem lịch hẹn, cập nhật dịch vụ</li>
                <li>Marketing: Quản lý khuyến mãi, báo cáo</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setShowCreateModal(false)}>
                Hủy
              </button>
              <button className="primary-btn" onClick={handleSave}>
               Lưu tài khoản
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;