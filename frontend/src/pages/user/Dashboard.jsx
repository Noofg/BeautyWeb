import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Dashboard.css";
import { getUserAppointments } from "../../api/AppointmentApi";
import {sendMessage} from "../../api/ChatApi";
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [memberPoints, setMemberPoints] = useState(0);
  const [input, setInput] = useState(""); 
  const [loadingChat, setLoadingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (!userId || userRole !== "CUSTOMER") {
      navigate("/login");
      return;
    }

    setUser({ id: userId, name: userName, role: userRole });

    // Mock data - in real app, fetch from API
    const loadAppointments = async () => {
    try {
      const res = await getUserAppointments(userId);

      // chỉ lấy lịch sắp tới
      const upcoming = res.data.filter(a =>
        new Date(a.appointmentDate) > new Date()
      );

      setUpcomingAppointments(upcoming);
    } catch (err) {
      console.error(err);
    }
  };

  loadAppointments();

  // mock điểm (sau có thể API)
  setMemberPoints(250);

}, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return '#28a745';
      case 'PENDING': return '#ffc107';
      case 'COMPLETED': return '#6c757d';
      case 'CANCELLED': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'PENDING': return 'Đang chờ';
      case 'COMPLETED': return 'Hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

  const handleSendMessage = async () => {
    if (loadingChat) return;
    if (!input.trim()) return;
  
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
  
    const currentInput = input;
    setInput("");
    setLoadingChat(true);
  
    // 🔥 gọi API đúng
    const reply = await sendMessage(currentInput);
  
    const botMessage = { role: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
  
    setLoadingChat(false);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Chào mừng, {user.name}!</h1>
        <p>Quản lý tài khoản và lịch hẹn của bạn</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{upcomingAppointments.length}</h3>
            <p>Lịch hẹn sắp tới</p>
          </div>
        </div>

        <div className="stat-card clickable"
  onClick={() => navigate("/loyalty")}>
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{memberPoints}</h3>
            <p>Điểm tích lũy</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎫</div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Voucher khả dụng</p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="appointments-section">
        <div className="section-header">
          <h2>Lịch hẹn sắp tới</h2>
          <button
            className="btn-primary"
            onClick={() => navigate("/appointments")}
          >
            Xem tất cả
          </button>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="appointments-list">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{appointment.service}</h4>
                  <p className="appointment-date">
                    {formatDate(appointment.appointmentDate)}
                  </p>
                </div>
                <div className="appointment-status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(appointment.status) }}
                  >
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>Chưa có lịch hẹn nào</h3>
            <p>Hãy đặt lịch để trải nghiệm dịch vụ của chúng tôi</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/booking")}
            >
              Đặt lịch ngay
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Truy cập nhanh</h2>
        <div className="actions-grid">
          <button
            className="action-btn"
            onClick={() => navigate("/booking")}
          >
            <div className="action-icon">📅</div>
            <span>Đặt lịch hẹn</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/appointments")}
          >
            <div className="action-icon">📋</div>
            <span>Lịch sử hẹn</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/profile")}
          >
            <div className="action-icon">👤</div>
            <span>Hồ sơ cá nhân</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/voucher")}
          >
            <div className="action-icon">🎫</div>
            <span>Ví voucher</span>
          </button>
        </div>
        
      </div>
     {/* CHAT BOT */}
<div className="chat-container">
  {/* Nút mở chat */}
  <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
    💬
  </button>

  {/* Box chat */}
  {showChat && (
    <div className="chat-box">
      <div className="chat-header">
        <span>Trợ lý AI</span>
        <button onClick={() => setShowChat(false)}>✖</button>
      </div>

      <div className="chat-body">
        {messages.length === 0 && (
          <p className="chat-welcome">Xin chào 👋 Bạn cần tư vấn gì?</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}

        {loadingChat && <p className="chat-loading">Đang trả lời...</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
       <button onClick={handleSendMessage} disabled={loadingChat}>
  {loadingChat ? "Đang gửi..." : "Gửi"}
</button>
      </div>
    </div>
  )}
</div>
    </div>

    
  );
}

export default Dashboard;