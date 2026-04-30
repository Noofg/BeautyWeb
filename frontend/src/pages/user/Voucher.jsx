import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Voucher.css";
import { useModal } from "../../context/ModalContext";
function Voucher() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [vouchers, setVouchers] = useState([]);
const { showModal } = useModal();
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
    setVouchers([
      {
        id: "1",
        code: "BEAUTY2024",
        title: "Giảm 20% dịch vụ chăm sóc da",
        description: "Áp dụng cho tất cả dịch vụ chăm sóc da mặt",
        discount: "20%",
        expiryDate: "2024-12-31",
        status: "ACTIVE",
        usedCount: 0,
        maxUses: 1
      },
      {
        id: "2",
        code: "MEMBER50K",
        title: "Giảm 50.000đ",
        description: "Giảm trực tiếp 50.000đ cho hóa đơn từ 500.000đ",
        discount: "50.000đ",
        expiryDate: "2024-06-30",
        status: "ACTIVE",
        usedCount: 0,
        maxUses: 1
      },
      {
        id: "3",
        code: "SPA30",
        title: "Giảm 30% Spa & Massage",
        description: "Giảm 30% cho dịch vụ Spa và Massage",
        discount: "30%",
        expiryDate: "2024-03-31",
        status: "EXPIRED",
        usedCount: 0,
        maxUses: 1
      },
      {
        id: "4",
        code: "NAIL15",
        title: "Giảm 15% Nail Art",
        description: "Giảm 15% cho dịch vụ làm nail",
        discount: "15%",
        expiryDate: "2024-08-31",
        status: "USED",
        usedCount: 1,
        maxUses: 1
      }
    ]);
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const getStatusColor = (voucher) => {
    if (voucher.status === "USED") return "#dc3545";
    if (voucher.status === "EXPIRED" || isExpired(voucher.expiryDate)) return "#6c757d";
    return "#28a745";
  };

  const getStatusText = (voucher) => {
    if (voucher.status === "USED") return "Đã sử dụng";
    if (voucher.status === "EXPIRED" || isExpired(voucher.expiryDate)) return "Đã hết hạn";
    return "Có thể sử dụng";
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    showModal(`Đã sao chép mã: ${code}`);
  };

  const activeVouchers = vouchers.filter(v => v.status === "ACTIVE" && !isExpired(v.expiryDate));

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="voucher-page">
      <div className="page-header">
        <h1>Ví Voucher</h1>
        <p>Quản lý các mã giảm giá dành riêng cho bạn</p>
      </div>

      {/* Voucher Stats */}
      <div className="voucher-stats">
        <div className="stat-item">
          <div className="stat-number">{activeVouchers.length}</div>
          <div className="stat-label">Voucher khả dụng</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {vouchers.filter(v => v.status === "USED").length}
          </div>
          <div className="stat-label">Đã sử dụng</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {vouchers.filter(v => v.status === "EXPIRED" || isExpired(v.expiryDate)).length}
          </div>
          <div className="stat-label">Đã hết hạn</div>
        </div>
      </div>

      {/* Voucher List */}
      <div className="voucher-container">
        {vouchers.length > 0 ? (
          <div className="voucher-grid">
            {vouchers.map(voucher => (
              <div
                key={voucher.id}
                className={`voucher-card ${voucher.status === "USED" || isExpired(voucher.expiryDate) ? 'used' : ''}`}
              >
                <div className="voucher-header">
                  <div className="voucher-title">
                    <h3>{voucher.title}</h3>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(voucher) }}
                    >
                      {getStatusText(voucher)}
                    </span>
                  </div>
                  <div className="voucher-discount">
                    <span className="discount-amount">{voucher.discount}</span>
                  </div>
                </div>

                <div className="voucher-body">
                  <p className="voucher-description">{voucher.description}</p>

                  <div className="voucher-details">
                    <div className="detail-item">
                      <span className="label">Mã voucher:</span>
                      <div className="code-section">
                        <code className="voucher-code">{voucher.code}</code>
                        {voucher.status === "ACTIVE" && !isExpired(voucher.expiryDate) && (
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(voucher.code)}
                            title="Sao chép mã"
                          >
                            📋
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="label">Hết hạn:</span>
                      <span className={`expiry-date ${isExpired(voucher.expiryDate) ? 'expired' : ''}`}>
                        {formatDate(voucher.expiryDate)}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="label">Sử dụng:</span>
                      <span>{voucher.usedCount}/{voucher.maxUses}</span>
                    </div>
                  </div>
                </div>

                {voucher.status === "ACTIVE" && !isExpired(voucher.expiryDate) && (
                  <div className="voucher-actions">
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/booking")}
                    >
                      Sử dụng ngay
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎫</div>
            <h3>Chưa có voucher nào</h3>
            <p>Voucher sẽ được tích lũy khi bạn sử dụng dịch vụ</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/booking")}
            >
              Đặt lịch để nhận voucher
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

export default Voucher;