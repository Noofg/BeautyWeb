import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/admincss/Admin.css'; // Common admin styles
import '../../css/admincss/Home.css'; // Home page specific styles
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const revenueData = [
  { day: "T2", revenue: 28 },
  { day: "T3", revenue: 21 },
  { day: "T4", revenue: 14 },
  { day: "T5", revenue: 7 },
  { day: "T6", revenue: 18 },
  { day: "T7", revenue: 25 },
  { day: "CN", revenue: 30 },
];
const branchData = [
  { name: "Q.1", value: 32 },
  { name: "Q.3", value: 23 },
  { name: "Bình Thạnh", value: 20 },
  { name: "Q.7", value: 25 },
];
  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="active"><Link to="/admin">Tổng quan</Link></li>
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
              <h1>Dashboard Quản trị</h1>
              <p>Tổng quan hệ thống Belle Beauté</p>
            </div>
          </div>
          <div className="user-info">
            <span>Admin User</span>
            <span>admin@bellebeaute.vn</span>
          </div>
        </header>
        <div className="metrics">
          <div className="metric-card">
            <h3>Doanh thu hôm nay</h3>
            <p>28.5M</p>
            <span>+12.5%</span>
          </div>
          <div className="metric-card">
            <h3>Lịch hẹn hôm nay</h3>
            <p>42</p>
            <span>+8 so với hôm qua</span>
          </div>
          <div className="metric-card">
            <h3>Khách hàng mới</h3>
            <p>18</p>
            <span>+5 so với tuần trước</span>
          </div>
          <div className="metric-card">
            <h3>Dịch vụ đã thực hiện</h3>
            <p>156</p>
            <span>+15.2%</span>
          </div>
        </div>
        <div className="chart-section">
          <h3>Biểu đồ doanh thu 7 ngày</h3>
          <div className="chart-placeholder" style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer>
    <LineChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</div>
        </div>
       <div className="branch-revenue">
  <h3>Doanh thu theo chi nhánh</h3>

  <div className="branch-container">
    
    {/* 👉 BÊN TRÁI: TEXT */}
    <ul className="branch-list">
      <li>Chi nhánh Q.1: 32%</li>
      <li>Chi nhánh Q.3: 23%</li>
      <li>Chi nhánh Bình Thạnh: 20%</li>
      <li>Chi nhánh Q.7: 25%</li>
    </ul>

    {/* 👉 BÊN PHẢI: BIỂU ĐỒ */}
    <div className="branch-chart">
      <PieChart width={300} height={250}>
        <Pie
          data={branchData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label
        >
          {branchData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>

  </div>
</div>
        
        <div className="top-services">
          <h3>Top dịch vụ bán chạy</h3>
          <ol>
            <li>Chăm sóc da mặt - 72.5M - 145 lượt đặt</li>
            <li>Massage body - 48.0M - 120 lượt đặt</li>
            <li>Nail gel - 34.3M - 98 lượt đặt</li>
            <li>Nhuộm tóc - 60.8M - 76 lượt đặt</li>
            <li>Makeup cô dâu - 90.0M - 45 lượt đặt</li>
          </ol>
        </div>
        <div className="inventory-warnings">
          <h3>Cảnh báo tồn kho</h3>
          <div className="warning-item">
            <p>Serum vitamin C - Sắp hết - Tối thiểu: 20 chai - 12/20</p>
          </div>
          <div className="warning-item">
            <p>Tinh dầu massage - Sắp hết - Tối thiểu: 15 chai - 8/15</p>
          </div>
          <div className="warning-item">
            <p>Sơn gel nail - Hết hàng - Tối thiểu: 20 lọ - 0/20</p>
          </div>
          <div className="warning-item">
            <p>Phấn nền makeup - Sắp hết - Tối thiểu: 12 hộp - 8/12</p>
          </div>
          <button>Xem chi tiết kho</button>
        </div>
        <div className="branch-details">
          <div className="branch-card">
            <h4>Chi nhánh Q.1</h4>
            <p>Doanh thu tháng này: 120.0M</p>
            <p>Khách hàng: 120</p>
            <p>Nhân viên: 15</p>
          </div>
          <div className="branch-card">
            <h4>Chi nhánh Q.3</h4>
            <p>Doanh thu tháng này: 85.0M</p>
            <p>Khách hàng: 140</p>
            <p>Nhân viên: 18</p>
          </div>
          <div className="branch-card">
            <h4>Chi nhánh Q.7</h4>
            <p>Doanh thu tháng này: 95.0M</p>
            <p>Khách hàng: 160</p>
            <p>Nhân viên: 21</p>
          </div>
          <div className="branch-card">
            <h4>Chi nhánh Bình Thạnh</h4>
            <p>Doanh thu tháng này: 75.0M</p>
            <p>Khách hàng: 180</p>
            <p>Nhân viên: 24</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
