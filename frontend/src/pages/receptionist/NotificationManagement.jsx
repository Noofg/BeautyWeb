import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/receptionistcss/NotificationManagement.css'; // NotificationManagement page specific styles

function NotificationManagement() {
  const [activeTab, setActiveTab] = useState('send');
  const [messageType, setMessageType] = useState('sms');
  const [recipients, setRecipients] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    { id: 'reminder', name: 'Nhắc lịch hẹn', content: 'Xin chào [TÊN_KHÁCH], lịch hẹn của bạn tại Belle Beauté vào [GIỜ] ngày [NGÀY]. Cảm ơn!' },
    { id: 'confirmation', name: 'Xác nhận lịch hẹn', content: 'Kính chào quý khách, lịch hẹn của bạn đã được xác nhận...' },
    { id: 'promotion', name: 'Khuyến mãi đặc biệt', content: 'Belle Beauté tri ân khách hàng - Giảm 20% tất cả dịch vụ. Đặt lịch ngay!' },
    { id: 'thankyou', name: 'Cảm ơn đã sử dụng dịch vụ', content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Belle Beauté...' }
  ];

  const messageHistory = [
    {
      id: '#001',
      recipient: '0901234567 - Nguyễn Hương Giang',
      content: 'Xin chào Nguyễn Hương Giang, lịch hẹn của bạn tại Belle Beauté vào 14:00 ngày 12/03/2024. Cảm ơn!',
      date: '12/03/2024 09:00',
      type: 'SMS',
      status: 'Đã gửi',
      template: 'Nhắc lịch hẹn'
    },
    {
      id: '#002',
      recipient: 'minhanh@email.com - Trần Minh Anh',
      content: 'Kính chào quý khách, lịch hẹn của bạn đã được xác nhận...',
      date: '12/03/2024 08:30',
      type: 'EMAIL',
      status: 'Đã gửi',
      template: 'Xác nhận lịch hẹn'
    },
    {
      id: '#003',
      recipient: '0923456789 - Lê Thu Hương',
      content: 'Belle Beauté tri ân khách hàng - Giảm 20% tất cả dịch vụ. Đặt lịch ngay!',
      date: '11/03/2024 16:00',
      type: 'SMS',
      status: 'Đã gửi',
      template: 'Khuyến mãi đặc biệt'
    },
    {
      id: '#004',
      recipient: 'thanhmai@email.com - Phạm Thanh Mai',
      content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Belle Beauté...',
      date: '11/03/2024 15:30',
      type: 'EMAIL',
      status: 'Đã gửi',
      template: 'Cảm ơn đã sử dụng dịch vụ'
    },
    {
      id: '#005',
      recipient: '0945678901 - Võ Minh Tuấn',
      content: 'Nhắc nhở: Bạn có lịch hẹn vào 10:00 ngày 13/03/2024 tại Belle Beauté.',
      date: '12/03/2024 08:00',
      type: 'SMS',
      status: 'Thất bại',
      template: 'Nhắc lịch hẹn'
    }
  ];

  const filteredHistory = messageHistory.filter(message =>
    message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent(template.content);
    }
  };

  const handleSendMessage = () => {
    // Handle sending message logic here
    alert('Tin nhắn đã được gửi thành công!');
    // Reset form
    setRecipients('');
    setSelectedTemplate('');
    setContent('');
  };

  const handleSaveDraft = () => {
    // Handle saving draft logic here
    alert('Đã lưu nháp thành công!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã gửi': return '#27ae60';
      case 'Đang gửi': return '#f39c12';
      case 'Thất bại': return '#e74c3c';
      default: return '#666';
    }
  };

  const getMessageStats = (status) => {
    return messageHistory.filter(msg => msg.status === status).length;
  };

  return (
    <div className="notification-management">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
          <p>Dashboard Lễ tân</p>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/receptionist">Tổng quan</Link></li>
          <li><Link to="/receptionist/appointments">Lịch hẹn</Link></li>
          <li><Link to="/receptionist/customers">Khách hàng</Link></li>
          <li><Link to="/receptionist/checkin">Check-in</Link></li>
          <li className="active"><Link to="/receptionist/notifications">Thông báo</Link></li>
          <li><Link to="/receptionist/feedback">Phản hồi</Link></li>
          <li>Đăng xuất</li>
          <li>Cài đặt</li>
        </ul>
        <div className="sidebar-footer">
          <div className="profile-card">
            <div>
              <div className="profile-name">Lễ tân</div>
              <div className="profile-role">Nhân viên lễ tân</div>
            </div>
            <div className="profile-email">receptionist@bellebeaute.vn</div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Quản lý thông báo</h1>
            <p>Dashboard Lễ tân</p>
            <p>Gửi SMS và Email cho khách hàng</p>
          </div>
          <div className="user-info">
            <span>Lễ tân</span>
            <span>receptionist@bellebeaute.vn</span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-icon">💬</div>
            <div className="stat-content">
              <h3>Tổng tin nhắn</h3>
              <p className="stat-number">{messageHistory.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon sent-icon">✅</div>
            <div className="stat-content">
              <h3>Đã gửi</h3>
              <p className="stat-number">{getMessageStats('Đã gửi')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon sending-icon">🔄</div>
            <div className="stat-content">
              <h3>Đang gửi</h3>
              <p className="stat-number">{getMessageStats('Đang gửi')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon failed-icon">❌</div>
            <div className="stat-content">
              <h3>Thất bại</h3>
              <p className="stat-number">{getMessageStats('Thất bại')}</p>
            </div>
          </div>
        </div>

        <div className="notification-management-section">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'send' ? 'active' : ''}`}
              onClick={() => setActiveTab('send')}
            >
              Gửi thông báo
            </button>
            <button
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Lịch sử gửi
            </button>
          </div>

          {activeTab === 'send' && (
            <div className="send-notification-section">
              <div className="message-type-selector">
                <button
                  className={`type-button ${messageType === 'sms' ? 'active' : ''}`}
                  onClick={() => setMessageType('sms')}
                >
                  SMS
                </button>
                <button
                  className={`type-button ${messageType === 'email' ? 'active' : ''}`}
                  onClick={() => setMessageType('email')}
                >
                  Email
                </button>
              </div>

              <div className="send-form">
                <div className="form-group">
                  <label>Người nhận *</label>
                  <input
                    type="text"
                    placeholder={messageType === 'sms' ? 'Nhập số điện thoại' : 'Nhập địa chỉ email'}
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                  />
                  <small>Có thể nhập nhiều {messageType === 'sms' ? 'số điện thoại' : 'địa chỉ email'}, cách nhau bởi dấu phẩy</small>
                </div>

                <div className="form-group">
                  <label>Chọn mẫu</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                  >
                    <option value="">-- Chọn mẫu --</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Nội dung *</label>
                  <textarea
                    placeholder="Nhập nội dung..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={messageType === 'sms' ? 160 : 1000}
                    rows={6}
                  />
                  <small>
                    Độ dài: {content.length}/{messageType === 'sms' ? 160 : 1000} ký tự
                  </small>
                </div>

                <div className="variables-info">
                  <h4>Biến có thể sử dụng:</h4>
                  <div className="variables-list">
                    <span>[TÊN_KHÁCH]</span>
                    <span>[NGÀY]</span>
                    <span>[GIỜ]</span>
                    <span>[DỊCH_VỤ]</span>
                    <span>[BÁC_SĨ]</span>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="send-btn" onClick={handleSendMessage}>
                    Gửi ngay
                  </button>
                  <button className="draft-btn" onClick={handleSaveDraft}>
                    Lưu nháp
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <div className="section-header">
                <h2>Lịch sử gửi</h2>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Người nhận</th>
                      <th>Nội dung</th>
                      <th>Thời gian</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Mẫu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map(message => (
                      <tr key={message.id}>
                        <td className="recipient-cell">
                          <div className="recipient-info">{message.recipient}</div>
                          <div className="message-id">{message.id}</div>
                        </td>
                        <td className="content-cell">
                          <div className="message-content">{message.content}</div>
                        </td>
                        <td className="date-cell">{message.date}</td>
                        <td>
                          <span className={`type-badge ${message.type.toLowerCase()}`}>
                            {message.type}
                          </span>
                        </td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(message.status) }}
                          >
                            {message.status}
                          </span>
                        </td>
                        <td className="template-cell">{message.template}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredHistory.length === 0 && (
                <div className="no-results">
                  <p>Không tìm thấy tin nhắn nào phù hợp với tiêu chí tìm kiếm.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationManagement;