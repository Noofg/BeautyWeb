import React, { useEffect, useState } from 'react';
import '../../css/admincss/CustomerManagement.css';
import { Link } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
import {
  createCustomer,
  getCustomerAll,
  updateCustomer,
  deleteCustomer,
  searchCustomers
} from '../../api/CustomerApi';

function CustomerMg() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const [error, setError] = useState('');
  const { showModal } = useModal();
  const [createForm, setCreateForm] = useState({
    name: '',
    gender: '',
    phone: '',
    address: '',
    visitCount: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    typeCustomer: '',
    notes: '',
    source: ''
  });

  //  load data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getCustomerAll();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    const customers = users.map((user, index) => ({
    id: user.id,
    stt: index + 1,

    name: user.name || 'Không rõ',
    gender: user.gender || '-',
    phone: user.phone || '-',
    address: user.address || '-',

    visitCount: user.visitCount ?? 0,
    totalSpent: user.totalSpent ?? 0,
    loyaltyPoints: user.loyaltyPoints ?? 0,

    typeCustomer: user.typeCustomer || '-',
    notes: user.notes || ''
  }));
    const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.typeCustomer.toLowerCase().includes(searchTerm.toLowerCase())
  );
    const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
    const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!createForm.name || !createForm.phone) {
      showModal({
        title: "Thiếu thông tin",
        message: "Vui lòng nhập đầy đủ thông tin khách hàng.",
        type: "warning"
      });
      return;
    }

    try {
      const payload = {
        name: createForm.name,
        gender: createForm.gender,
        phone: createForm.phone,
        address: createForm.address,
        visitCount: Number(createForm.visitCount) || 0,
        totalSpent: Number(createForm.totalSpent) || 0,
        loyaltyPoints: Number(createForm.loyaltyPoints) || 0,
        typeCustomer: createForm.typeCustomer,
        notes: createForm.notes,
        source: createForm.source
      };

      await createCustomer(payload); // ✅ FIX API

      showModal({
        title: "Thành công",
        message: "Thêm khách hàng thành công.",
        type: "success"
      });
      setShowCreateModal(false);

      setCreateForm({
        name: '',
        gender: '',
        phone: '',
        address: '',
        visitCount: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
        typeCustomer: '',
        notes: '',
        source: ''
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
      showModal({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi tạo khách hàng.",
        type: "error"
      });
      showModal({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi tạo khách hàng.",
        type: "error"
      });
    }
  };
    const handleUpdate = async (id, data) => {
    try {
      await updateCustomer(id, data);
      showModal({
        title: "Thành công",
        message: "Cập nhật khách hàng thành công.",
        type: "success"
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
    const handleDelete = async (id) => {
    if (!window.confirm('Xoá khách này?')) return;

    try {
      await deleteCustomer(id);
      alert('Đã xoá');
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
    const handleSearch = async () => {
    if (!searchTerm) return fetchUsers();

    try {
      const res = await searchCustomers(searchTerm);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Belle Beauté</h2>
          <p>Hệ thống quản lý</p>
        </div>
        <ul className="sidebar-menu">
           <li className="active"><Link to="/receptionist">Tổng quan</Link></li>
                                      <li><Link to="/admin">Tổng quan</Link></li>
                                                  <li><Link to="/admin/users">Người dùng</Link></li>
                                                  <li><Link to="/admin/branches">Chi nhánh</Link></li>
                                                  <li><Link to="/admin/departments">Phòng ban</Link></li>
                                                  <li><Link to="/admin/employees">Nhân viên</Link></li>
                                                  <li><Link to="/admin/stats">Thống kê</Link></li>
                                                  <li><Link to="/admin/customers">Khách hàng</Link></li>
                                                  <li className="active"><Link to="/admin/services">Dịch vụ</Link></li>
                                                   <li><Link to="/admin/vouchers">Voucher</Link></li>
                                                    <li><Link to="/admin/category">Danh mục</Link></li>
                                                    <li><Link to="/admin/products">Kho Sản Phẩm</Link></li>
                                                  <li><Link to="/admin/reports">Báo cáo</Link></li>
                                                  <li><Link to="/admin/settings">Cài đặt</Link></li>
                                                  <li><Link to="/admin/logout">Đăng xuất</Link></li>
        </ul>
        <div className="sidebar-footer">
          <div className="profile-card">
            <div>
              <div className="profile-name">Receptionist</div>
              <div className="profile-role">Khách Hàng</div>
            </div>
            <div className="profile-email">admin@bellebeaute.vn</div>
          </div>
        </div>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <div></div>
              <div></div>
              <div></div>
            </button>
            <div>
              <h1>Khách Hàng </h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý thông tin  khách hàng</p>
            </div>
          </div>
          <div className="user-info">
            <span>Receptionist</span>
            <span>receptionist@bellebeaute.vn</span>
          </div>
        </header>

        <div className="overview-section">
          <h2>Tổng quan</h2>
          <div className="overview-stats">
            <div className="stat-item">
              <h3>Tổng khách hàng</h3>
              <p>4</p>
            </div>
           
            <div className="stat-item">
              <h3>Người dùng</h3>
              <p>4</p>
            </div>
           
            
            <div className="stat-item">
              <h3>Tổng doanh thu</h3>
              <p>81.5M</p>
            </div>
            <div className="stat-item">
              <h3>Lượt ghé thăm</h3>
              <p>50</p>
            </div>
           
            <div className="stat-item">
              <h3>Khách hàng</h3>
              <p>4</p>
            </div>
          </div>
        </div>

        <div className="customer-management-section">
          <div className="section-header">
            <h2>Người dùng</h2>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="export-btn">
                Xuất Excel
              </button>
              <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                Thêm khách hàng mới 
              </button>
            </div>
          </div>

          <div className="customer-table-container">
            {loading ? (
              <div className="loading-text">Đang tải danh sách người dùng...</div>
            ) : (
              <>
                {error && <div className="error-text">{error}</div>}
                <table className="customer-table">
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>Giới tính</th>
                      <th>Liên hệ</th>
                      <th>Địa chỉ</th>
                      <th>Lượt đến</th>
                      <th>Tổng chi</th>
                      <th>Điểm tích lũy</th>
                      <th>Loại khách hàng </th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                          <td className="customer-info">
                            <div className="customer-name">
                              <div className="avatar">{customer.name.charAt(0)}</div>
                              <div>
                                <div className="name">{customer.name}</div>
                                <div className="id">{customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <div>{customer.gender}</div>
                              <div className="email">{customer.phone}</div>
                            </div>
                          </td>
                          <td className="address">{customer.address}</td>
                          <td className="visits">{customer.visits} lần</td>
                          <td className="total-spent">{customer.totalSpent}</td>
                          <td>{customer.lastVisit}</td>
                          <td>
                            <span className={`status ${customer.status === 'Hoạt động' ? 'active' : 'inactive'}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td>
                            <div className="actions">
                              <button className="edit-btn" onClick={() => handleUpdate(customer)}>
                                Sửa
                              </button>
                              <button className="delete-btn" onClick={() => handleDelete(customer.id)}>
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Không có khách hàng phù hợp.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Khách hàng mới</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-grid">
                <label>
                  Họ và tên *
                  <input
                    type="text"
                    name="name"
                    value={createForm.name}
                    onChange={handleCreateFormChange}
                    required
                  />
                </label>
                <label>
                  Giới tính *
                  <select
                    name="gender"
                    value={createForm.gender}
                    onChange={handleCreateFormChange}
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                    
                </label>
                <label>
                  Địa chỉ *
                  <input
                    type="text"
                    name="address"
                    value={createForm.address}
                    onChange={handleCreateFormChange}
                    required
                  />
                </label>
                <label>
                  Số điện thoại *
                  <input
                    type="tel"
                    name="phone"
                    value={createForm.phone}
                    onChange={handleCreateFormChange}
                    required
                  />
                </label>
              
                <label>
                  Loại khách hàng
                  <select
                    type="date"
                    name="typeCustomer"
                    value={createForm.typeCustomer}
                    onChange={handleCreateFormChange}
                  >
                    <option value="">Chọn loại khách hàng</option>
                    <option value="Vip">Vip</option>
                    <option value="Thường">Thường</option>
                    </select>
                </label>
                <label>
                  Nguồn khách hàng
                  <select
                    name="source"
                    value={createForm.source}
                    onChange={handleCreateFormChange}
                  >
                    <option value="">Chọn nguồn</option>
                    <option value="Website">Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Giới thiệu">Giới thiệu</option>
                    <option value="Khác">Khác</option>
                  </select>
                </label>
              </div>
              <div className="modal-textarea">
                <label>
                  Ghi chú
                  <textarea
                    rows="3"
                    name="notes"
                    value={createForm.notes}
                    onChange={handleCreateFormChange}
                    placeholder="Ghi chú về khách hàng..."
                  ></textarea>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowCreateModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="primary-btn">Khách hàng mới </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerMg;