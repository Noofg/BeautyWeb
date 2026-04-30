    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { useModal } from "../../context/ModalContext";
    import {
      getCategories,
      createCategory,
      deleteCategory,
      
      updateCategory
    } from "../../api/CategoryApi";
    
    import "../../css/admincss/Admin.css";
    import "../../css/admincss/Service.css";
    
    function Category() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [categories, setCategories] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [showModal, setShowModal] = useState(false);
        const { showModal: showAlert } = useModal();
      const [editingCategory, setEditingCategory] = useState(null);
     const [form, setForm] = useState({
  name: "",
  description: "",
  active: true
});
    
      // LOAD DATA
      const loadData = async () => {
        try {
          const res = await getCategories();
          setCategories(res.data || []);
        } catch (err) {
          console.error(err);
        }
      };
    
      useEffect(() => {
        loadData();
      }, []);
    
      // SEARCH
      const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      // INPUT
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
      // SAVE
      const handleSave = async () => {
      if (!form.name || !form.description) {
        
        showAlert({
          title: "Thiếu dữ liệu",
          message: "Vui lòng nhập đầy đủ thông tin danh mục.",
          type: "warning"
        });
        return;
      }
    
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          ...form,
          price: Number(form.price)
        });
        showAlert({
          title: "Thành công",
          message: "Cập nhật danh mục thành công.",
          type: "success"
        });
      } else {
        await createCategory({
          ...form,
          price: Number(form.price)
        });
        showAlert({
          title: "Thành công",
          message: "Thêm danh mục thành công.",
          type: "success"
        });
      }
    
      setShowModal(false);
      setEditingCategory(null);
      setForm({ name: "", description: "", price: "", image: "" });
    
      loadData();
    };
      // DELETE
      const handleDelete = async (id) => {
        if (!window.confirm("Xóa danh mục?")) return;
        await deleteCategory(id);
        loadData();
      };
    const handleEdit = (category) => {
      setEditingCategory(category);
      setForm(category);
      setShowModal(true);
    };
      // STATS
      const totalCategories = categories.length;
      const totalDescription = categories.reduce((sum, c) => sum + (c.price || 0), 0);

  
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
                <li><Link to="/admin/category">Danh mục</Link></li>
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
                  <h1>Danh mục sản phẩm </h1>
                  <p>Hệ thống quản lý</p>
                  <p>Quản lý danh sách danh mục sản phẩm </p>
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
                  <h3>Tổng danh mục </h3>
                  <p>{totalCategories}</p>
                </div>
    
                <div className="stat-item">
                  <h3>Tổng giá trị</h3>
                  <p>{totalDescription.toLocaleString()} VNĐ</p>
                </div>
              </div>
            </div>
    
            {/* LIST */}
            <div className="branch-management-section">
              <div className="section-header">
                <h2>Danh mục sản phẩm </h2>
    
                <div className="actions">
                  <input
                    type="text"
                    placeholder="Tìm kiếm ..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
    
                  <button
                    className="add-btn"
                    onClick={() => setShowModal(true)}
                  >
                    Thêm danh mục
                  </button>
                </div>
              </div>
    
              <div className="branch-grid">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((c) => (
                    <div className="service-card" key={c.id}>
    
                      <div className="service-content">
                        <h3 className="service-title">{c.name}</h3>
                        <p className="service-desc">{c.description}</p>
    
                          <div className="actions">
                            <button
                              className="edit-btn"
                              onClick={() => handleEdit(c)}
                            >
                              Sửa
                            </button>
    
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(c.id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
    
                  ))
                ) : (
                  <div className="empty-state">Không có danh mục</div>
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
                <h3>Thêm danh mục</h3>
                <button onClick={() => setShowModal(false)}>×</button>
              </div>
    
              <div className="modal-grid">
                <label>
                  Tên danh mục *
                  <input name="name" value={form.name} onChange={handleChange} />
                </label>
    
                <label style={{ gridColumn: "span 2" }}>
                  Mô tả
                  <textarea name="description" value={form.description} onChange={handleChange} />
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
    
    export default Category;