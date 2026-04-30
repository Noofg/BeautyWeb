import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/receptionistcss/CheckInManagement.css'; // CheckInManagement page specific styles

function CheckInManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const waitingCustomers = [
    {
      id: '#001',
      number: '101',
      name: 'Nguyễn Hương Giang',
      type: 'VIP',
      status: 'Trong phòng',
      phone: '0901234567',
      service: 'Chăm sóc da mặt',
      staff: 'BS. Minh Anh',
      room: 'P101',
      checkInTime: '08:45',
      waitTime: '5 phút',
      priority: 'high'
    },
    {
      id: '#002',
      number: '102',
      name: 'Trần Minh Châu',
      type: 'Thường',
      status: 'Sẵn sàng',
      phone: '0912345678',
      service: 'Massage body',
      staff: 'KTV. Thu Hà',
      room: 'P201',
      checkInTime: '09:00',
      waitTime: '15 phút',
      priority: 'normal'
    },
    {
      id: '#003',
      number: '103',
      name: 'Lê Thu Hương',
      type: 'Thường',
      status: 'Đang chờ',
      phone: '0923456789',
      service: 'Nail gel',
      staff: 'KTV. Lan Anh',
      room: 'Chờ phòng',
      checkInTime: '09:15',
      waitTime: '25 phút',
      priority: 'normal'
    },
    {
      id: '#004',
      number: '104',
      name: 'Phạm Thanh Mai',
      type: 'Khẩn',
      status: 'Đang chờ',
      phone: '0934567890',
      service: 'Nhuộm tóc',
      staff: 'BS. Bích Ngọc',
      room: 'Chờ phòng',
      checkInTime: '09:30',
      waitTime: '35 phút',
      priority: 'urgent'
    },
    {
      id: '#005',
      number: '105',
      name: 'Võ Minh Tuấn',
      type: 'VIP',
      status: 'Đang chờ',
      phone: '0945678901',
      service: 'Cắt tóc',
      staff: 'KTV. Hồng Nhung',
      room: 'Chờ phòng',
      checkInTime: '09:40',
      waitTime: '40 phút',
      priority: 'high'
    }
  ];

  const roomStatus = [
    { id: 'P101', status: 'occupied', customer: 'Nguyễn Hương Giang', staff: 'BS. Minh Anh' },
    { id: 'P102', status: 'available', customer: null, staff: null },
    { id: 'P103', status: 'available', customer: null, staff: null },
    { id: 'P104', status: 'available', customer: null, staff: null },
    { id: 'P201', status: 'available', customer: null, staff: null },
    { id: 'P202', status: 'available', customer: null, staff: null },
    { id: 'P301', status: 'available', customer: null, staff: null },
    { id: 'P302', status: 'available', customer: null, staff: null }
  ];

  const filteredCustomers = waitingCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.staff.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Trong phòng': return '#27ae60';
      case 'Sẵn sàng': return '#3498db';
      case 'Đang chờ': return '#f39c12';
      default: return '#666';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'VIP': return '#9b59b6';
      case 'Khẩn': return '#e74c3c';
      case 'Thường': return '#95a5a6';
      default: return '#666';
    }
  };

  const getRoomStatusColor = (status) => {
    switch (status) {
      case 'occupied': return '#e74c3c';
      case 'available': return '#27ae60';
      default: return '#666';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⭐';
      default: return '';
    }
  };

  const longWaitCustomers = waitingCustomers.filter(customer => parseInt(customer.waitTime) > 30);

  const stats = {
    total: 45,
    completed: 38,
    serving: 1,
    waiting: 3
  };

  return (
    <div className="checkin-management">
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
          <div style={{ display: 'flex', alignItems: 'center' }} >
             <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <div></div>
              <div></div>
              <div></div>
            </button>
            <h1>Check-in Management</h1>
          </div>
          <div className="user-info">
            <span>Lễ tân</span>
            <span>receptionist@bellebeaute.vn</span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-icon">👥</div>
            <div className="stat-content">
              <h3>Tổng số khách</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed-icon">✅</div>
            <div className="stat-content">
              <h3>Đã hoàn thành</h3>
              <p className="stat-number">{stats.completed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon serving-icon">🔄</div>
            <div className="stat-content">
              <h3>Đang phục vụ</h3>
              <p className="stat-number">{stats.serving}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon waiting-icon">⏳</div>
            <div className="stat-content">
              <h3>Đang chờ</h3>
              <p className="stat-number">{stats.waiting}</p>
            </div>
          </div>
        </div>

        {longWaitCustomers.length > 0 && (
          <div className="alert-section">
            <div className="alert-card warning">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h4>Cảnh báo thời gian chờ</h4>
                <p>Có {longWaitCustomers.length} khách hàng đã chờ quá 30 phút. Vui lòng ưu tiên xử lý hoặc thông báo cho khách.</p>
              </div>
            </div>
          </div>
        )}

        <div className="waiting-queue-section">
          <div className="section-header">
            <h2>Danh sách khách đang chờ <span className="queue-count">({filteredCustomers.length})</span></h2>
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
                <option value="Đang chờ">Đang chờ</option>
                <option value="Sẵn sàng">Sẵn sàng</option>
                <option value="Trong phòng">Trong phòng</option>
              </select>
            </div>
          </div>

          <div className="waiting-queue-table">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Số</th>
                  <th>Khách hàng</th>
                  <th>Loại</th>
                  <th>Trạng thái</th>
                  <th>SĐT</th>
                  <th>Dịch vụ</th>
                  <th>Bác sĩ/KTV</th>
                  <th>Phòng</th>
                  <th>Check-in</th>
                  <th>Thời gian chờ</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className={customer.priority === 'urgent' ? 'urgent-row' : customer.priority === 'high' ? 'high-row' : ''}>
                    <td className="number-cell">
                      <span className="customer-number">{customer.number}</span>
                      {getPriorityIcon(customer.priority)}
                    </td>
                    <td className="customer-cell">
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-id">{customer.id}</div>
                    </td>
                    <td>
                      <span
                        className="type-badge"
                        style={{ backgroundColor: getTypeColor(customer.type) }}
                      >
                        {customer.type}
                      </span>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(customer.status) }}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="phone-cell">{customer.phone}</td>
                    <td>{customer.service}</td>
                    <td>{customer.staff}</td>
                    <td className="room-cell">{customer.room}</td>
                    <td className="checkin-cell">{customer.checkInTime}</td>
                    <td className="wait-cell">
                      <div className="wait-time">{customer.waitTime}</div>
                      {parseInt(customer.waitTime) > 30 && (
                        <div className="wait-warning">⚠️</div>
                      )}
                    </td>
                    <td>
                      <div className="actions">
                        <button className="call-btn">Gọi khách</button>
                        {customer.status === 'Đang chờ' && (
                          <button className="ready-btn">Sẵn sàng</button>
                        )}
                        {customer.status === 'Sẵn sàng' && (
                          <button className="room-btn">Vào phòng</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy khách hàng nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          )}
        </div>

        <div className="room-status-section">
          <div className="section-header">
            <h2>Trạng thái phòng</h2>
          </div>

          <div className="room-grid">
            {roomStatus.map(room => (
              <div key={room.id} className={`room-card ${room.status}`}>
                <div className="room-header">
                  <span className="room-id">{room.id}</span>
                  <span
                    className="room-status-indicator"
                    style={{ backgroundColor: getRoomStatusColor(room.status) }}
                  >
                    {room.status === 'occupied' ? 'Đang sử dụng' : 'Trống'}
                  </span>
                </div>
                {room.customer && (
                  <div className="room-customer">
                    <div className="customer-name">{room.customer}</div>
                    <div className="customer-staff">{room.staff}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckInManagement;