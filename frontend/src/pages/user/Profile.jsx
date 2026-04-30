import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Profile.css";
import {useModal} from "../../context/ModalContext";
function Profile() {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skinType: "",
    healthConditions: "",
    specialNotes: ""
  });

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
    setForm({
      name: userName,
      email: "user@example.com",
      phone: "0123 456 789",
      skinType: "Da dầu",
      healthConditions: "Không có bệnh lý đặc biệt",
      specialNotes: "Thích massage nhẹ nhàng, không dùng sản phẩm có mùi mạnh"
    });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // In real app, call API to update profile
    showModal("Cập nhật hồ sơ thành công!");
    setIsEditing(false);
    // Update localStorage if name changed
    if (form.name !== user.name) {
      localStorage.setItem("userName", form.name);
      setUser({ ...user, name: form.name });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    setForm({
      name: user.name,
      email: "user@example.com",
      phone: "0123 456 789",
      skinType: "Da dầu",
      healthConditions: "Không có bệnh lý đặc biệt",
      specialNotes: "Thích massage nhẹ nhàng, không dùng sản phẩm có mùi mạnh"
    });
  };

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Hồ sơ cá nhân</h1>
        <p>Quản lý thông tin cá nhân và sở thích của bạn</p>
      </div>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>Thành viên từ 2024</p>
            </div>
          </div>

          <div className="edit-actions">
            {!isEditing ? (
              <button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa hồ sơ
              </button>
            ) : (
              <div className="edit-buttons">
                <button
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Lưu thay đổi
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-section">
            <h3>Thông tin liên lạc</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Họ và tên</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <p className="form-value">{form.name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <p className="form-value">{form.email}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Số điện thoại</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <p className="form-value">{form.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Thông tin làm đẹp</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Loại da</label>
                {isEditing ? (
                  <select
                    name="skinType"
                    value={form.skinType}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Chọn loại da</option>
                    <option value="Da khô">Da khô</option>
                    <option value="Da dầu">Da dầu</option>
                    <option value="Da hỗn hợp">Da hỗn hợp</option>
                    <option value="Da nhạy cảm">Da nhạy cảm</option>
                    <option value="Da thường">Da thường</option>
                  </select>
                ) : (
                  <p className="form-value">{form.skinType || "Chưa cập nhật"}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tình trạng sức khỏe</label>
                {isEditing ? (
                  <textarea
                    name="healthConditions"
                    value={form.healthConditions}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Mô tả tình trạng sức khỏe, bệnh lý nền (nếu có)..."
                  />
                ) : (
                  <p className="form-value">{form.healthConditions || "Chưa cập nhật"}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Lưu ý đặc biệt</label>
                {isEditing ? (
                  <textarea
                    name="specialNotes"
                    value={form.specialNotes}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Sở thích, không thích, lưu ý cho bác sĩ..."
                  />
                ) : (
                  <p className="form-value">{form.specialNotes || "Chưa cập nhật"}</p>
                )}
              </div>
            </div>
          </div>
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
    </div>
  );
}

export default Profile;