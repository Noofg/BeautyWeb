import React, { useState } from "react";
import "../../css/Register.css";
import { registerUser } from "../../api/AuthApi";
import { useModal } from "../../context/ModalContext";

function Register() {
  const { showModal } = useModal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showModal("Mật khẩu không khớp!");
      return;
    }

    if (!form.agree) {
      showModal("Bạn phải đồng ý điều khoản!");
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      showModal("Đăng ký thành công!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      showModal("Đăng ký thất bại!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h3>Tạo tài khoản</h3>
        <p className="register-subtitle">
          Đăng ký để bắt đầu sử dụng hệ thống quản lý
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nguyễn Văn A"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="email@example.com"
              onChange={handleChange}
              required
            />
          </div>

          {/* SĐT */}
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="0123456789"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </div>

          {/* Checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="agree"
              onChange={handleChange}
            />
            <label className="form-check-label">
              Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật
            </label>
          </div>

          {/* Button */}
          <button type="submit" className="btn-register">
            Đăng ký
          </button>
        </form>

        <p className="register-footer">
          Đã có tài khoản?{" "}
          <a href="/login" className="register-link">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;