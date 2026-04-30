import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBranches, createBranch } from '../../api/BranchApi';
import '../../css/admincss/Admin.css'; // Common admin styles
import '../../css/admincss/BranchManagement.css'; 
import { fetchEmployees } from '../../api/EmployeeApi';
import { useModal } from "../../context/ModalContext"; 

function BranchManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [employees, setEmployees] = useState([]);
   const { showModal } = useModal();
  const [newBranch, setNewBranch] = useState({
    name: '',
    manager: '',
    address: '',
    phone: '',
    openHours: '08:00 - 20:00',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBranches()
      .then((response) => {
        setBranches(response.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Không tải được danh sách chi nhánh. Vui lòng thử lại sau.');
        setLoading(false);
      });
  }, []);

  const filteredBranches = branches.filter((branch) => {
    const term = searchTerm.toLowerCase();
    return (
      branch.name.toLowerCase().includes(term) ||
      branch.manager.toLowerCase().includes(term) ||
      branch.address.toLowerCase().includes(term)
    );
  });

  const totalRevenue = branches.reduce((sum, branch) => {
    const value = Number(branch.revenue?.replace(/[^0-9]/g, '') || 0);
    return sum + value;
  }, 0);

  const handleInputChange = (e) => {
    setNewBranch({
      ...newBranch,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.manager || !newBranch.address || !newBranch.phone) {
      showModal({
      title: "Thiếu thông tin",
      message: "Vui lòng nhập đầy đủ email và mật khẩu",
    });
      return;
    }

    try {
      const response = await createBranch({
        ...newBranch,
        status: 'Hoạt động',
        staffCount: 0,
        customerCount: 0,
        revenue: '0',
      });
      setBranches((prev) => [response.data, ...prev]);
      setShowCreateModal(false);
      setNewBranch({
        name: '',
        manager: '',
        address: '',
        phone: '',
        openHours: '08:00 - 20:00',
      });
    } catch (err) {
      console.error(err);
      showModal({
        title: "Lỗi",
        message: "Không thể tạo chi nhánh mới. Vui lòng thử lại.",
        type: "error"
      });
    }
  };
  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    }
  
  };
  useEffect(() => {
  loadEmployees();
}, []);
const countEmployeesByBranch = (branchName) => {
  return employees.filter(emp => emp.branches === branchName).length;
};

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin">Tổng quan</Link></li>
          <li><Link to="/admin/users">Người dùng</Link></li>
          <li className="active"><Link to="/admin/branches">Chi nhánh</Link></li>
          <li><Link to="/admin/departments">Phòng ban</Link></li>
          <li><Link to="/admin/employees">Nhân viên</Link></li>
          <li><Link to="/admin/stats">Thống kê</Link></li>
          <li><Link to="/admin/customers">Khách hàng</Link></li>
          <li><Link to="/admin/services">Dịch vụ</Link></li>
           <li><Link to="/admin/vouchers">Voucher</Link></li>
            <li><Link to="/admin/category">Kho hàng </Link></li>
          <li><Link to="/admin/reports">Báo cáo</Link></li>
          <li><Link to="/admin/settings">Cài đặt</Link></li>
          <li><Link to="/admin/logout">Đăng xuất</Link></li>
        </ul>
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
              <h1>Quản lý chi nhánh</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý thông tin và hoạt động các chi nhánh</p>
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
              <h3>Tổng chi nhánh</h3>
              <p>{branches.length}</p>
            </div>
            <div className="stat-item">
              <h3>Tổng doanh thu</h3>
              <p>{totalRevenue.toLocaleString()} VNĐ</p>
            </div>
            <div className="stat-item">
              <h3>Tổng nhân viên</h3>
              <p>{employees.length}</p>
            </div>
            <div className="stat-item">
              <h3>Tổng khách hàng</h3>
              <p>{branches.reduce((sum, branch) => sum + (branch.customerCount || 0), 0)}</p>
            </div>
          </div>
        </div>

        <div className="branch-management-section">
          <div className="section-header">
            <h2>Chi nhánh</h2>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm chi nhánh..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="add-btn" onClick={() => setShowCreateModal(true)}>
                Thêm chi nhánh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-text">Đang tải chi nhánh...</div>
          ) : (
            <>
              {error && <div className="error-text">{error}</div>}
              <div className="branch-grid">
                {filteredBranches.length > 0 ? (
                  filteredBranches.map((branch) => (
                    <div className="branch-card" key={branch.id}>
                      <div className="branch-header">
                        <h3>{branch.name}</h3>
                        <span className={`status ${branch.status === 'Hoạt động' ? 'active' : 'inactive'}`}>
                          {branch.status}
                        </span>
                      </div>
                      <div className="branch-info">
                        <p><strong>Quản lý:</strong> {branch.manager}</p>
                        <p><strong>Địa chỉ:</strong> {branch.address}</p>
                        <p><strong>SĐT:</strong> {branch.phone}</p>
                        <p><strong>Giờ mở cửa:</strong> {branch.openHours}</p>
                      </div>
                      <div className="branch-stats">
                        <div className="stat">
                          <span className="stat-label">Nhân viên</span>
                          <span className="stat-value"> {countEmployeesByBranch(branch.name)}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Khách hàng</span>
                          <span className="stat-value">{branch.customerCount || 0}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Doanh thu</span>
                          <span className="stat-value">{branch.revenue || '0'}</span>
                        </div>
                      </div>
                      <div className="branch-actions">
                        <button className="edit-btn">Sửa</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">Không có chi nhánh phù hợp.</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Tạo chi nhánh mới</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleCreateBranch}>
              <label>
                Tên chi nhánh *
                <input type="text" name="name" value={newBranch.name} onChange={handleInputChange} required />
              </label>
              <label>
                Quản lý *
                <input type="text" name="manager" value={newBranch.manager} onChange={handleInputChange} required />
              </label>
              <label>
                Địa chỉ *
                <input type="text" name="address" value={newBranch.address} onChange={handleInputChange} required />
              </label>
              <label>
                SĐT *
                <input type="text" name="phone" value={newBranch.phone} onChange={handleInputChange} required />
              </label>
              <label>
                Giờ mở cửa
                <input type="text" name="openHours" value={newBranch.openHours} onChange={handleInputChange} />
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="save-btn">
                  Lưu chi nhánh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BranchManagement;
