import React, { useState } from "react";
import "../../css/Booking.css";
import { bookAppointment } from "../../api/AppointmentApi";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

function Booking() {
  const [showLoginModal, setShowLoginModal] = useState(false);
   const navigate = useNavigate();
   const { showModal } = useModal();

  const [form, setForm] = useState({
    service: "",
    appointmentDate: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const services = [
    "Chăm sóc da mặt",
    "Massage & Spa",
    "Nail & Spa",
    "Tóc & Tạo kiểu",
    "Makeup",
    "VIP",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Chưa login
  if (!token || !userId) {
    showModal({
      title: "Yêu cầu đăng nhập",
      message: "Bạn cần đăng nhập để đặt lịch",
    });
    setShowLoginModal(true);
    return;
  }

  // Validate
  if (!form.service || !form.appointmentDate) {
    showModal({
      title: "Lỗi",
      message: "Vui lòng chọn dịch vụ và thời gian!",
      type: "error"
    });
    return;
  }

  setIsLoading(true);

  try {
    // Gọi hàm từ service (token sẽ được tự động thêm bởi interceptor)
    const response = await bookAppointment(userId, {
      ...form,
      userId: userId,
    });

    showModal({
      title: "Thành công",
      message: "Đặt lịch thành công!",
      type: "success"
    });

      setForm({
      service: "Chăm sóc da mặt",
      appointmentDate: "",
      notes: "",
    });

    
    setTimeout(() => {
      navigate("/home");
    }, 1000);


  } catch (err) {
    console.error("Booking error:", err);
    showModal({
      title: "Lỗi",
      message: err.message || "Đặt lịch thất bại!",
      type: "error"
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="booking-page">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card p-4 shadow">
              <h2 className="text-center mb-4">Đặt Lịch Hẹn</h2>

              <form onSubmit={handleSubmit}>
                {/* Service Selection */}
                <div className="mb-3">
                  <label className="form-label">Chọn Dịch Vụ</label>
                  <select
                    className="form-select"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Appointment Date */}
                <div className="mb-3">
                  <label className="form-label">Chọn Thời Gian</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Notes */}
                <div className="mb-3">
                  <label className="form-label">Ghi Chú (Tùy Chọn)</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Nhập ghi chú của bạn..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Đặt Lịch"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Yêu cầu đăng nhập</h3>
      <p>Bạn cần đăng nhập để đặt lịch</p>

      <div className="modal-actions">
        <button
          className="btn-cancel"
          onClick={() => setShowLoginModal(false)}
        >
          Huỷ
        </button>

        <button
          className="btn-confirm"
          onClick={() => {
            setShowLoginModal(false);
            navigate("/login");
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Booking;
