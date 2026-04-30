import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getServices,
  createService,
  deleteService,
  updateService
} from "../../api/ServiceApi";
import { useModal } from "../../context/ModalContext";
import "../../css/admincss/Admin.css";
import "../../css/admincss/Service.css";

function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
const { showModal: showAlert } = useModal();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await getServices();
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // SEARCH
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result
      }));
    };

    if (file) reader.readAsDataURL(file);
  };

  // SAVE
  const handleSave = async () => {
  if (!form.name || !form.price) {
    showAlert({
      title: "Lỗi",
      message: "Vui lòng điền đầy đủ thông tin.",
      type: "error"
    });
    return;
  }

  if (editingService) {
    await updateService(editingService.id, {
      ...form,
      price: Number(form.price)
    });
    showAlert({
      title: "Thành công",
      message: "Cập nhật dịch vụ thành công!",
      type: "success"
    });
  } else {
    await createService({
      ...form,
      price: Number(form.price)
    });
    showAlert({
      title: "Thành công",
      message: "Tạo dịch vụ thành công!",
      type: "success"
    });
  }

  setShowModal(false);
  setEditingService(null);
  setForm({ name: "", description: "", price: "", image: "" });

  loadData();
};
  // DELETE
  const handleDelete = async (id) => {
    showAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa dịch vụ này không?",
      type: "warning",
      onConfirm: async () => {
        try {
          await deleteService(id);
          loadData();
        } catch (err) {
          console.error(err);
          showAlert({
            title: "Lỗi",
            message: "Có lỗi xảy ra khi xóa dịch vụ.",
            type: "error"
          });
        }
      }
    });
  };
const handleEdit = (service) => {
  setEditingService(service);
  setForm(service);
  setShowModal(true);
};
  // STATS
  const totalServices = services.length;
  const totalPrice = services.reduce((sum, s) => sum + (s.price || 0), 0);

  return (
  <>
    <div className="admin-dashboard">
      
      {/* SIDEBAR */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
        </div>

        <ul className="sidebar-menu">
          <li><Link to="/admin">Tổng quan</Link></li>
          <li><Link to="/admin/users">Người dùng</Link></li>
          <li><Link to="/admin/branches">Chi nhánh</Link></li>
          <li><Link to="/admin/departments">Phòng ban</Link></li>
          <li><Link to="/admin/employees">Nhân viên</Link></li>
          <li><Link to="/admin/stats">Thống kê</Link></li>
          <li><Link to="/admin/customers">Khách hàng</Link></li>
          <li className="active"><Link to="/admin/services">Dịch vụ</Link></li>
           <li><Link to="/admin/vouchers">Voucher</Link></li>
            <li><Link to="/admin/category">Danh mục </Link></li>
            <li><Link to="/admin/products">Kho Sản Phẩm</Link></li>
          <li><Link to="/admin/reports">Báo cáo</Link></li>
          <li><Link to="/admin/settings">Cài đặt</Link></li>
          <li><Link to="/admin/logout">Đăng xuất</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        
        {/* HEADER */}
        <header className="dashboard-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="hamburger"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <div></div><div></div><div></div>
            </button>

            <div>
              <h1>Quản lý dịch vụ</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý danh sách dịch vụ</p>
            </div>
          </div>

          <div className="user-info">
            <span>Admin User</span>
            <span>admin@bellebeaute.vn</span>
          </div>
        </header>

        {/* OVERVIEW */}
        <div className="overview-section">
          <h2>Tổng quan</h2>
          <div className="overview-stats">
            <div className="stat-item">
              <h3>Tổng dịch vụ</h3>
              <p>{totalServices}</p>
            </div>

            <div className="stat-item">
              <h3>Tổng giá trị</h3>
              <p>{totalPrice.toLocaleString()} VNĐ</p>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="branch-management-section">
          <div className="section-header">
            <h2>Dịch vụ</h2>

            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                className="add-btn"
                onClick={() => setShowModal(true)}
              >
                Thêm dịch vụ
              </button>
            </div>
          </div>

          <div className="branch-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((s) => (
                <div className="service-card" key={s.id}>

                  <div className="service-image">
                    {s.image && <img src={s.image} alt={s.name} />}
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">{s.name}</h3>
                    <p className="service-desc">{s.description}</p>

                    <div className="service-footer">
                      <span className="price">
                        {s.price?.toLocaleString()} VNĐ
                      </span>

                      <div className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(s)}
                        >
                          Sửa
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(s.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-state">Không có dịch vụ</div>
            )}
          </div>
        </div>

      </div>
    </div>

    {/* MODAL */}
    {showModal && (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <h3>Thêm dịch vụ</h3>
            <button onClick={() => setShowModal(false)}>×</button>
          </div>

          <div className="modal-grid">
            <label>
              Tên dịch vụ *
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label>
              Giá *
              <input name="price" value={form.price} onChange={handleChange} />
            </label>

            <label style={{ gridColumn: "span 2" }}>
              Mô tả
              <textarea name="description" value={form.description} onChange={handleChange} />
            </label>

            <label style={{ gridColumn: "span 2" }}>
              Ảnh
              <input type="file" onChange={handleImage} />
            </label>
          </div>

          <div className="modal-actions">
            <button onClick={() => setShowModal(false)}>Hủy</button>
            <button onClick={handleSave}>Lưu</button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default Services;