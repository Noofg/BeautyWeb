import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import { loginUser } from "../../api/AuthApi";
import { useModal } from "../../context/ModalContext"; 

function Login() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    showModal({
      title: "Thiếu thông tin",
      message: "Vui lòng nhập đầy đủ email và mật khẩu",
    });
    return;
  }

  try {
    const res = await loginUser(form);
     console.log("LOGIN RESPONSE:", res.data);
    // Lấy đúng data từ backend
    const { token, role, user } = res.data;

    //  Lưu token 
    localStorage.setItem("token", token);

    //  Lưu thông tin user
    localStorage.setItem("userId", user?.id);
    localStorage.setItem("userName", user?.name);
    localStorage.setItem("userRole", role);

   showModal({
      title: "Thành công",
      message: "Đăng nhập thành công!",
      onConfirm: () => {
        const redirectPath = getRedirectPath(role);
        navigate(redirectPath);
      }
    });

  } catch (error) {
     console.log("LOGIN ERROR STATUS:", error.response?.status);
    console.log("LOGIN ERROR DATA:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      "Đăng nhập thất bại! Vui lòng kiểm tra email và mật khẩu.";

    console.error("Login error:", error.response?.status, error.response?.data);
   showModal({
      title: "Lỗi đăng nhập",
      message: errorMessage,
    });
  }
};

  const getRedirectPath = (role) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "/admin";
      case "DOCTOR":
        return "/doctor";
      case "STAFF":
        return "/receptionist";
      
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Đăng nhập</h3>
        <p className="text-center text-muted">
          Chào mừng bạn quay lại hệ thống
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              placeholder="email@example.com"
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
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Ghi nhớ</label>
            </div>
            <a href="#" className="text-decoration-none">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              Quên mật khẩu?
            </a>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>

        <p className="text-center mt-3">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-primary">
            Đăng ký ngay
          </a>
        </p>
      </div>
     
    </div>
  );
}

export default Login;