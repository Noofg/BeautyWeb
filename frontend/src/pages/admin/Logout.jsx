import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/admincss/Admin.css';

function Logout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
const handleLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
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
          <li className="active"><Link to="/admin/logout">Đăng xuất</Link></li>
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
              <h1>Đăng xuất</h1>
              <p>Đăng xuất khỏi trang quản trị</p>
              <p>Bạn có thể đăng nhập lại để tiếp tục quản lý.</p>
            </div>
          </div>
          <div className="user-info">
            <span>Admin User</span>
            <span>admin@bellebeaute.vn</span>
          </div>
        </header>

        <div style={{ padding: '20px', background: '#fff', borderRadius: '24px' }}>
          <h2>Đăng xuất thành công</h2>
          <p>Bạn đã đăng xuất khỏi hệ thống.</p>
         <button className="add-btn" onClick={handleLogout}>
  Đăng nhập lại
</button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
