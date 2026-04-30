import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import '../../css/receptionistcss/AppointmentManagement.css'; // AppointmentManagement page specific styles
import axios from 'axios'; 
import {getAllAppointments,cancelAppointment} from '../../api/AppointmentApi';
function AppointmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments();

      // 🔥 map lại dữ liệu
      const mapped = res.data.map(item => ({
        id: item.id,
        appointmentDate: item.appointmentDate,
        userName: item.userName,
        phone: item.phone,
        service: item.service,
        duration: item.duration || '60 phút',
        status: item.status,
        notes: `${item.notes || '_'}`
      }));

      setAppointments(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);
const filteredAppointments = appointments.filter(appointment => {
  const matchesSearch =
    appointment.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone?.includes(searchTerm) ||
    appointment.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    filterStatus === 'all' || appointment.status === filterStatus;

  return matchesSearch && matchesStatus;
});
  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành': return '#27ae60';
      case 'Đang thực hiện': return '#f39c12';
      case 'Đã xác nhận': return '#3498db';
      case 'Chờ xác nhận': return '#e74c3c';
      default: return '#666';
    }
  };
  const getStatusStats = (status) => {
    return appointments.filter(a => a.status === status).length;
  };
  const mapStatus = (status) => {
  switch (status) {
    case 'PENDING': return 'Chờ xác nhận';
    case 'CONFIRMED': return 'Đã xác nhận';
    case 'IN_PROGRESS': return 'Đang thực hiện';
    case 'COMPLETED': return 'Hoàn thành';
    default: return status;
  }
};

  return (
    <div className="appointment-management">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                   <div className="sidebar-header">
                     <h2>Belle Beauté</h2>
                     <p>Hệ thống quản lý</p>
                   </div>
                   <ul className="sidebar-menu">
                     <li className="active"><Link to="/receptionist">Tổng quan</Link></li>
                     <li><Link to="/receptionist/appointments">Lịch hẹn </Link></li>
                     <li><Link to="/receptionist/customers">Khách hàng</Link></li>
                     <li><Link to="/receptionist/checkin">Check in </Link></li>
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
            <h1>Quản lý lịch hẹn</h1>
            
          </div>
          <div className="user-info">
            <span>Lễ tân</span>
            <span>receptionist@bellebeaute.vn</span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-icon">📅</div>
            <div className="stat-content">
              <h3>Tổng lịch hẹn</h3>
              <p className="stat-number">{appointments.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending-icon">⏳</div>
            <div className="stat-content">
              <h3>Chờ xác nhận</h3>
              <p className="stat-number">{getStatusStats('Chờ xác nhận')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon confirmed-icon">✅</div>
            <div className="stat-content">
              <h3>Đã xác nhận</h3>
              <p className="stat-number">{getStatusStats('Đã xác nhận')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon in-progress-icon">🔄</div>
            <div className="stat-content">
              <h3>Đang thực hiện</h3>
              <p className="stat-number">{getStatusStats('Đang thực hiện')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed-icon">🎉</div>
            <div className="stat-content">
              <h3>Hoàn thành</h3>
              <p className="stat-number">{getStatusStats('Hoàn thành')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon customers-icon">👥</div>
            <div className="stat-content">
              <h3>Khách hàng</h3>
              <p className="stat-number">6</p>
            </div>
          </div>
        </div>

        <div className="appointment-management-section">
          <div className="section-header">
            <h2>Danh sách lịch hẹn</h2>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SĐT, dịch vụ..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
              <button className="create-btn">
                Thêm khách hàng mới 
              </button>
            </div>
          </div>

          <div className="appointment-table-container">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Khách hàng</th>
                  <th>Dịch vụ</th>
                  <th>Ghi chú</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td className="time-cell">
                      <div className="appointment-time">{appointment.appointmentDate}</div>
                  
                    </td>
                    <td className="customer-cell">
                      <div className="customer-name">{appointment.userName}</div>
                      <div className="customer-phone">{appointment.phone}</div>
                      <div className="appointment-id">{appointment.id}</div>
                    </td>
                    <td>{appointment.service}</td>
                    <td>{appointment.notes || "--"}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="edit-btn">Sửa</button>
                        <button  className="cancel-btn"
  onClick={async () => {
    try {
      await cancelAppointment(appointment.id);

      // reload lại list
      setAppointments(prev =>
        prev.map(item =>
          item.id === appointment.id
            ? { ...item, status: 'Đã hủy' }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  }}>Hủy</button>
                        {appointment.status === 'Chờ xác nhận' && (
                          <button className="confirm-btn">Xác nhận</button>
                        )}
                        {appointment.status === 'Đã xác nhận' && (
                          <button className="start-btn">Bắt đầu</button>
                        )}
                        {appointment.status === 'Đang thực hiện' && (
                          <button className="complete-btn">Hoàn thành</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy lịch hẹn nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentManagement;