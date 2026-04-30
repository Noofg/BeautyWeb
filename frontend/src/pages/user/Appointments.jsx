import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Appointments.css";
import { getUserAppointments } from "../../api/AppointmentApi";
function Appointments() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [memberPoints, setMemberPoints] = useState(0);
  
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
    
          setAppointments(upcoming);
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

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === "ALL") return true;
    return appointment.status === filter;
  });

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
      // In real app, call API to cancel
      setAppointments(appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: "CANCELLED" } : apt
      ));
      alert("Đã hủy lịch hẹn thành công!");
    }
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // In real app, open reschedule modal or redirect to booking with pre-filled data
    alert("Tính năng đổi lịch sẽ được cập nhật sớm!");
  };

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Lịch hẹn của tôi</h1>
        <p>Quản lý tất cả lịch hẹn đã đặt</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {[
          { key: "ALL", label: "Tất cả" },
          { key: "PENDING", label: "Đang chờ" },
          { key: "CONFIRMED", label: "Đã xác nhận" },
          { key: "COMPLETED", label: "Hoàn thành" },
          { key: "CANCELLED", label: "Đã hủy" }
        ].map(tab => (
          <button
            key={tab.key}
            className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="appointments-container">
        {filteredAppointments.length > 0 ? (
          <div className="appointments-list">
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <div className="appointment-info">
                    <h3>{appointment.service}</h3>
                    <p className="appointment-date">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                    {appointment.notes && (
                      <p className="appointment-notes">
                        <strong>Ghi chú:</strong> {appointment.notes}
                      </p>
                    )}
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

                {/* Action Buttons */}
                {(appointment.status === "PENDING" || appointment.status === "CONFIRMED") && (
                  <div className="appointment-actions">
                    <button
                      className="btn-secondary"
                      onClick={() => handleRescheduleAppointment(appointment.id)}
                    >
                      Đổi lịch
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Hủy lịch
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>Không có lịch hẹn nào</h3>
            <p>Không tìm thấy lịch hẹn với bộ lọc hiện tại</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/booking")}
            >
              Đặt lịch mới
            </button>
          </div>
        )}
      </div>

      {/* Back to Dashboard */}
      <div className="back-section">
        <button
          className="btn-outline"
          onClick={() => navigate("/dashboard")}
        >
          ← Quay lại Dashboard
        </button>
      </div>
    </div>
  );
}

export default Appointments;