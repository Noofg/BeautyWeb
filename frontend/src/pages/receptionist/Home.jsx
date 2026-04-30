import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ReceptionistDashboard.css';
import { Link } from 'react-router-dom';
function ReceptionistHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    // Check if user is logged in and is receptionist
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (!userId || userRole !== "STAFF") {
      navigate("/login");
      return;
    }

    setUser({ id: userId, name: userName, role: userRole });
  }, [navigate]);

  // Mock data - in real app, fetch from API
  const appointments = [
    {
      id: "1",
      time: "08:00",
      customer: "Nguyễn Hương Giang",
      service: "Chăm sóc da mặt",
      staff: "BS. Minh Anh",
      room: "P101",
      phone: "0901234567",
      duration: "60 phút",
      status: "completed"
    },
    {
      id: "2",
      time: "09:00",
      customer: "Trần Minh Châu",
      service: "Massage body",
      staff: "KTV. Thu Hà",
      room: "P201",
      phone: "0912345678",
      duration: "90 phút",
      status: "in-progress"
    },
    {
      id: "3",
      time: "09:30",
      customer: "Lê Thu Hương",
      service: "Nail gel",
      staff: "KTV. Lan Anh",
      room: "P301",
      phone: "0923456789",
      duration: "60 phút",
      status: "confirmed"
    },
    {
      id: "4",
      time: "10:00",
      customer: "Phạm Thanh Mai",
      service: "Nhuộm tóc",
      staff: "BS. Bích Ngọc",
      room: "P102",
      phone: "0934567890",
      duration: "120 phút",
      status: "confirmed"
    },
    {
      id: "5",
      time: "11:00",
      customer: "Võ Minh Tuấn",
      service: "Cắt tóc",
      staff: "KTV. Hồng Nhung",
      room: "P103",
      phone: "0945678901",
      duration: "45 phút",
      status: "pending"
    },
    {
      id: "6",
      time: "14:00",
      customer: "Đỗ Lan Anh",
      service: "Makeup dự tiệc",
      staff: "BS. Thanh Thảo",
      room: "P104",
      phone: "0956789012",
      duration: "60 phút",
      status: "confirmed"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'confirmed': return '#17a2b8';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang thực hiện';
      case 'confirmed': return 'Đã xác nhận';
      case 'pending': return 'Chờ xác nhận';
      default: return status;
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone.includes(searchTerm) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

 return (
  <div className="admin-dashboard">

    {/* Sidebar */}
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Belle Beauté</h2>
        <p>Hệ thống lễ tân</p>
      </div>

      <ul className="sidebar-menu">
        <li><Link to="/receptionist">Tổng quan</Link></li>
        <li><Link to="/receptionist/appointments">Lịch hẹn hôm nay</Link></li>
        <li><Link to="/receptionist/waiting">Khách đang chờ</Link></li>
        <li><Link to="/receptionist/customers">Khách hàng</Link></li>
        <li><Link to="/receptionist/feedback">Phản hồi</Link></li>
        <li><Link to="/receptionist/notifications">Thông báo</Link></li>
        <li><Link to="/login">Đăng xuất</Link></li>
      </ul>

      <div className="sidebar-footer">
        <div className="profile-card">
          <div>
            <div className="profile-name">{user?.name || "Receptionist"}</div>
            <div className="profile-role">Lễ tân</div>
          </div>
          <div className="profile-email">receptionist@bellebeaute.vn</div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>

    
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className="hamburger"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </button>

          <div>
            <h1>Dashboard Lễ tân</h1>
            <p>Quản lý lịch hẹn & khách hàng</p>
            <p>Theo dõi trạng thái khách theo thời gian thực</p>
          </div>
        </div>

        <div className="user-info">
          <span>{user?.name || "Receptionist"}</span>
          <span>receptionist@bellebeaute.vn</span>
        </div>
      </header>

      {/* Nội dung chính */}
      <div className="dashboard-content">

        {/* Stats */}
        <div className="stats-overview">
          <div className="stat-card">
            <h2>6</h2>
            <p>Lịch hẹn hôm nay</p>
          </div>

          <div className="stat-card">
            <h2>2</h2>
            <p>Khách đang chờ</p>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <p>Khách mới</p>
          </div>

          <div className="stat-card">
            <h2>4.8 ⭐</h2>
            <p>Đánh giá</p>
          </div>
        </div>

        {/* Table */}
        <div className="appointments-section">
          <h3>Lịch hẹn hôm nay</h3>

          <div className="appointments-table">
            <div className="table-header">
              <div>Thời gian</div>
              <div>Khách</div>
              <div>Dịch vụ</div>
              <div>KTV/Bác sĩ</div>
              <div>Phòng</div>
              <div>Trạng thái</div>
            </div>

            {filteredAppointments.map((item) => (
              <div key={item.id} className="table-row">
                <div>{item.time}</div>
                <div>{item.customer}</div>
                <div>{item.service}</div>
                <div>{item.staff}</div>
                <div>{item.room}</div>

                <div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    {getStatusText(item.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default ReceptionistHome;
