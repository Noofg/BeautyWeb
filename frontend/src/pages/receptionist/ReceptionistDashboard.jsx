import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/receptionistcss/ReceptionistDashboard.css'; // ReceptionistDashboard page specific styles
import {getTodayAppointments} from '../../api/AppointmentApi';
function ReceptionistDashboard() {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const [todayAppointments, setTodayAppointments] = useState([]);
  useEffect(() => {
  const fetchToday = async () => {
    try {
      const res = await getTodayAppointments();

      const mapped = res.data.map(item => ({
        time: new Date(item.appointmentDate).toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        customer: item.userName,
        service: item.service,
        staff: item.notes || '', // vì bạn gộp staff + room vào notes
        status: mapStatus(item.status)
      }));

      setTodayAppointments(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  fetchToday();
}, []);
const mapStatus = (status) => {
  switch (status) {
    case 'PENDING': return 'Chờ xác nhận';
    case 'CONFIRMED': return 'Đã xác nhận';
    case 'IN_PROGRESS': return 'Đang thực hiện';
    case 'COMPLETED': return 'Hoàn thành';
    default: return status;
  }
};
  const waitingCustomers = [
    {
      customer: 'Trần Minh Châu',
      waitTime: '15 phút',
      service: 'Massage body',
      room: 'P201',
      staff: 'KTV. Thu Hà'
    },
    {
      customer: 'Lê Thu Hương',
      waitTime: '5 phút',
      service: 'Nail gel',
      room: 'P102',
      staff: 'KTV. Lan Anh'
    }
  ];

  const newCustomers = [
    {
      name: 'Nguyễn Thị A',
      status: 'Mới',
      phone: '0901234567',
      date: '12/03/2024'
    },
    {
      name: 'Trần Văn B',
      status: 'Mới',
      phone: '0912345678',
      date: '12/03/2024'
    },
    {
      name: 'Lê Thị C',
      status: 'Mới',
      phone: '0923456789',
      date: '11/03/2024'
    }
  ];

  const popularServices = [
    { name: 'Chăm sóc da mặt', count: 45, increase: '+12%' },
    { name: 'Massage body', count: 38, increase: '+8%' },
    { name: 'Nail gel', count: 32, increase: '+15%' },
    { name: 'Nhuộm tóc', count: 28, increase: '+5%' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành': return '#27ae60';
      case 'Đang thực hiện': return '#f39c12';
      case 'Đang chờ': return '#e74c3c';
      case 'Đã xác nhận': return '#3498db';
      case 'Chờ xác nhận': return '#95a5a6';
      default: return '#666';
    }
  };

  return (
    <div className="receptionist-dashboard">
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
             <div className="sidebar-header">
               <h2>Belle Beauté</h2>
               <p>Hệ thống quản lý</p>
             </div>
             <ul className="sidebar-menu">
               <li className="active"><Link to="/receptionist">Tổng quan</Link></li>
               <li><Link to="/receptionist/appointments">Lịch hẹn </Link></li>
               <li><Link to="/receptionist/customers">Khách hàng</Link></li>
               <li><Link to="/receptionist/check-in">Check in </Link></li>
               <li><Link to="/receptionist/notifications">Thông báo </Link></li>
               <li><Link to="/receptionist/reviews">Phản hồi </Link></li>
               <li><Link to="/receptionist/services">Dịch vụ</Link></li>
               <li><Link to="/receptionist/reports">Báo cáo</Link></li>
               <li><Link to="/receptionist/settings">Cài đặt</Link></li>
               <li><Link to="/receptionist/logout">Đăng xuất</Link></li>
             </ul>
             <div className="sidebar-footer">
               <div className="profile-card">
                 <div>
                   <div className="profile-name">Lễ Tân</div>
                   <div className="profile-role">Nhân viên lễ tân</div>
                 </div>
                 <div className="profile-email">receptionist@bellebeaute.vn</div>
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
            <h1>Dashboard Lễ Tân</h1>
            <p>Quản lý khách hàng và lịch hẹn hôm nay</p>
            </div>
            
          </div>
          <div className="user-info">
            <span>Lễ tân</span>
            <span>receptionist@bellebeaute.vn</span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon appointments-icon">📅</div>
            <div className="stat-content">
              <h3>Lịch hẹn hôm nay</h3>
              <p className="stat-number">6</p>
              <span className="stat-label">lịch hẹn</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon waiting-icon">⏳</div>
            <div className="stat-content">
              <h3>Khách đang chờ</h3>
              <p className="stat-number">2</p>
              <span className="stat-label">2 đang chờ xác nhận</span>
            </div>
            <div className="stat-extra">TB: 10 phút</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new-customers-icon">👥</div>
            <div className="stat-content">
              <h3>Khách mới hôm nay</h3>
              <p className="stat-number">3</p>
              <span className="stat-label">+2 so với hôm qua</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rating-icon">⭐</div>
            <div className="stat-content">
              <h3>Đánh giá TB</h3>
              <p className="stat-number">4.8</p>
              <span className="stat-label">125 đánh giá</span>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="left-panel">
            <div className="panel-card">
              <div className="panel-header">
                <h3>Lịch hẹn hôm nay</h3>
                <span className="panel-count">6 lịch hẹn</span>
              </div>
              <div className="appointments-list">
                {todayAppointments.map((appointment, index) => (
                  <div key={index} className="appointment-item">
                    <div className="appointment-time">{appointment.time}</div>
                    <div className="appointment-details">
                      <div className="customer-name">{appointment.customer}</div>
                      <div className="service-info">{appointment.service}</div>
                      <div className="staff-info">{appointment.staff}</div>
                    </div>
                    <div
                      className="appointment-status"
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {appointment.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <h3>Khách hàng mới</h3>
                <span className="panel-count">+3 hôm nay</span>
              </div>
              <div className="new-customers-list">
                {newCustomers.map((customer, index) => (
                  <div key={index} className="customer-item">
                    <div className="customer-avatar">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="customer-info">
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-phone">{customer.phone}</div>
                      <div className="customer-date">{customer.date}</div>
                    </div>
                    <div className="customer-status">{customer.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="panel-card">
              <div className="panel-header">
                <h3>Khách đang chờ</h3>
                <span className="panel-count">2 khách</span>
              </div>
              <div className="waiting-list">
                {waitingCustomers.map((customer, index) => (
                  <div key={index} className="waiting-item">
                    <div className="waiting-header">
                      <div className="customer-name">{customer.customer}</div>
                      <div className="wait-time">{customer.waitTime}</div>
                    </div>
                    <div className="waiting-details">
                      <div className="service">{customer.service}</div>
                      <div className="room-staff">
                        <span>Phòng: {customer.room}</span>
                        <span>{customer.staff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <h3>Dịch vụ phổ biến</h3>
              </div>
              <div className="services-list">
                {popularServices.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-name">{service.name}</div>
                    <div className="service-stats">
                      <span className="service-count">{service.count}</span>
                      <span className="service-increase">{service.increase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button className="action-btn primary">
                <div className="btn-icon">📅</div>
                <div className="btn-text">
                  <div className="btn-title">Tạo lịch hẹn</div>
                  <div className="btn-subtitle">Đặt lịch cho khách hàng</div>
                </div>
              </button>

              <button className="action-btn secondary">
                <div className="btn-icon">👤</div>
                <div className="btn-text">
                  <div className="btn-title">Thêm khách mới</div>
                  <div className="btn-subtitle">Đăng ký khách hàng mới</div>
                </div>
              </button>

              <button className="action-btn success">
                <div className="btn-icon">✅</div>
                <div className="btn-text">
                  <div className="btn-title">Check-in</div>
                  <div className="btn-subtitle">Check-in khách hàng</div>
                </div>
              </button>

              <button className="action-btn warning">
                <div className="btn-icon">💬</div>
                <div className="btn-text">
                  <div className="btn-title">Phản hồi</div>
                  <div className="btn-subtitle">Xem đánh giá khách hàng</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;