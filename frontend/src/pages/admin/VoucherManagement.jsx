import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllVouchers,
  createVoucher,
  deleteVoucher,
  updateVoucher
} from "../../api/VoucherApi";
import { useModal } from "../../context/ModalContext";
import "../../css/admincss/Service.css";

function Vouchers () {
const [vouchers, setVouchers] = useState([]);
const [filteredVouchers, setFilteredVouchers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState(null);
const { showModal: showAlert } = useModal();
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [form, setForm] = useState({
  code: '',
  type: 'PERCENT',
  value: '',
  minOrder: '',
  maxDiscount: '',
  quantity: '',
  startDate: '',
  endDate: '',
  active: true
});

 useEffect(() => {
  fetchVouchers();
}, []);

  const fetchVouchers = async () => {
  try {
    const res = await getAllVouchers();
    setVouchers(res.data);
    setFilteredVouchers(res.data);
  } catch (err) {
    console.error(err);
  }
};
  // SEARCH
 useEffect(() => {
  const filtered = vouchers.filter(v =>
    v.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredVouchers(filtered);
}, [searchTerm, vouchers]);

  // INPUT
 const handleChange = (e) => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};

 const handleSave = async () => {
  try {
    const payload = {
      ...form,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      maxDiscount: Number(form.maxDiscount),
      quantity: Number(form.quantity)
    };

    if (editingId) {
      await updateVoucher(editingId, payload);
      showAlert({
        title: "Thành công",
        message: "Cập nhật voucher thành công!",
        type: "success"
      });
    } else {
      await createVoucher(payload);
      showAlert({
        title: "Thành công",
        message: "Thêm voucher thành công!",
        type: "success"
      });
    }

    setShowModal(false);
    resetForm();
    fetchVouchers();

  } catch (err) {
    console.error(err);
    showAlert({
      title: "Lỗi",
      message: "Lỗi khi lưu voucher",
      type: "error"
    });
  }
};

  // SAVE
  const handleEdit = (voucher) => {
  setForm({
    code: voucher.code,
    type: voucher.type,
    value: voucher.value,
    minOrder: voucher.minOrder,
    maxDiscount: voucher.maxDiscount,
    quantity: voucher.quantity,
    startDate: voucher.startDate?.slice(0, 10),
    endDate: voucher.endDate?.slice(0, 10),
    active: voucher.active
  });

  setEditingId(voucher.id);
  setShowModal(true);
};
  // DELETE
 const handleDelete = async (id) => {
  showAlert({
    title: "Xác nhận xóa",
    message: "Bạn có chắc chắn muốn xóa voucher này không?",
    type: "warning",
    onConfirm: async () => {
      try {
        await deleteVoucher(id);
        fetchVouchers();
      } catch (err) {
        console.error(err);
      }
    }
  });
 };
  // STATS
 const loadData = async () => {
  try {
    const res = await getAllVouchers();
    setVouchers(res.data);
  } catch (err) {
    console.error(err);
  }
};
const resetForm = () => {
  setForm({
    code: '',
    type: 'PERCENT',
    value: '',
    minOrder: '',
    maxDiscount: '',
    quantity: '',
    startDate: '',
    endDate: '',
    active: true
  });

  setEditingId(null);
};
 
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
          <li><Link to="/admin/services">Dịch vụ</Link></li>
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
              <h1>Quản lý voucher</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý danh sách voucher</p>
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
              <h3>Tổng voucher</h3>
              <p>{vouchers.length}</p>
            </div>

            <div className="stat-item">
              <h3>Đang hoạt động</h3>
              <p>{vouchers.filter(v => v.active).length}</p>
            </div>
          </div>
        </div>

       {/* LIST */}
<div className="branch-management-section">
  <div className="section-header">
    <h2>Danh sách voucher</h2>
    <div className="actions">
      <input
        type="text"
        placeholder="Tìm kiếm voucher..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="add-btn" onClick={() => setShowModal(true)}>
        Thêm voucher
      </button>
    </div>
  </div>

  <table className="customer-table">
    <thead>
      <tr>
        <th>Mã voucher</th>
        <th>Loại</th>
        <th>Giá trị</th>
        <th>Đơn tối thiểu</th>
        <th>Đã dùng / Tổng</th>
        <th>Thời hạn</th>
        <th>Trạng thái</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {filteredVouchers.length > 0 ? (
        filteredVouchers.map((voucher) => (
          <tr key={voucher._id}>
            <td><strong>{voucher.code || "—"}</strong></td>

            <td>{voucher.type === "PERCENT" ? "Phần trăm" : "Cố định"}</td>

            <td>
              {voucher.type === "PERCENT"
                ? `${voucher.value}%`
                : `${Number(voucher.value)} đ`}
            </td>

            <td>{Number(voucher.minOrder || 0)} đ</td>

            <td>{voucher.usedCount ?? 0} / {voucher.quantity ?? 0}</td>

            <td>
              {voucher.startDate
                ? new Date(voucher.startDate).toLocaleDateString("vi-VN")
                : "—"}{" "}
              -{" "}
              {voucher.endDate
                ? new Date(voucher.endDate).toLocaleDateString("vi-VN")
                : "—"}
            </td>

            <td>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  backgroundColor: voucher.active ? "#e6f4ea" : "#fce8e6",
                  color: voucher.active ? "#2e7d32" : "#c62828",
                }}
              >
                {voucher.active ? "Hoạt động" : "Tắt"}
              </span>
            </td>

            <td>
              <div className="actions">
                <button onClick={() => handleEdit(voucher)}>Sửa</button>
                <button onClick={() => handleDelete(voucher._id)}>Xoá</button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={8} style={{ textAlign: "center", padding: "24px", color: "#999" }}>
            Không có voucher nào
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
</div>

    {/* MODAL */}
    {showModal && (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <h3>Thêm voucher</h3>
            <button onClick={() => setShowModal(false)}>×</button>
          </div>

          <div className="modal-grid">
            <label>
              Code *
              <input name="code" value={form.code} onChange={handleChange} />
            </label>

            <label>
              Loại *
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="PERCENT">%</option>
                <option value="FIXED">Tiền</option>
              </select>
            </label>

            <label>
              Giá trị *
              <input name="value" value={form.value} onChange={handleChange} />
            </label>

            <label>
              Đơn tối thiểu
              <input name="minOrder" value={form.minOrder} onChange={handleChange} />
            </label>

            <label>
              Giảm tối đa
              <input name="maxDiscount" value={form.maxDiscount} onChange={handleChange} />
            </label>

            <label>
              Số lượng
              <input name="quantity" value={form.quantity} onChange={handleChange} />
            </label>

            <label>
              Ngày bắt đầu
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </label>

            <label>
              Ngày kết thúc
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
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

export default Vouchers;