import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
 
} from "../../api/ProductApi";
import { getCategories } from "../../api/CategoryApi";
import { useModal } from "../../context/ModalContext";
import "../../css/admincss/Service.css";

function Products () {
 const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showModal: showAlert } = useModal();

  const [form, setForm] = useState({
    name: '',
    categoryName: '',
    quantity: '',
    unit: '',
    price: '',
    supplier: '',
    minimumStockLevel:'',
    expiryDate: '',
    active: true
  });

  const fetchCategories = async () => {
  try {
    const res = await getCategories();
    setCategories(res.data);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchProducts();
  fetchCategories(); 
}, []);


  const fetchProducts = async () => {
    
    try {
      const data = await getProducts();
      console.log("DATA:", data); 
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const filtered = products.filter(p =>
      (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

   const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const filteredProduct= products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price)
      };

      if (editingId !== null) {
        await updateProduct(editingId, payload);
        showAlert({
          title: "Thành công",
          message: "Cập nhật sản phẩm thành công!",
          type: "success"
        });
      } else {
        await createProduct(payload);
        showAlert({
          title: "Thành công",
          message: "Thêm sản phẩm thành công!",
          type: "success"
        });
      }

      setShowModal(false);
      resetForm();
      fetchProducts();

    } catch (err) {
      console.error(err);
      showAlert({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi lưu sản phẩm.",
        type: "error"
      });
    }
  };

  const handleEdit = (product) => {
  setForm({
    name: product.name || "",
    categoryName: product.categoryName || "",
    quantity: product.quantity || "",
    unit: product.unit || "",
    price: product.price || "",
    supplier: product.supplier || "",
    expiryDate: product.expiryDate?.slice(0, 10) || "",
    active: product.active ?? true
  });

  setEditingId(product._id);
  setShowModal(true);
};
   const handleDelete = async (_id) => {
     if (!_id) {  
    console.error("❌ ID undefined");
    return;
  }
    showAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      type: "warning",
      onConfirm: async () => {
        try {
          await deleteProduct(_id);
          fetchProducts();
        } catch (err) {
          console.error(err);
          showAlert({
            title: "Lỗi",
            message: "Có lỗi xảy ra khi xóa sản phẩm.",
            type: "error"
          });
        }
      }
    });
  };
  const resetForm = () => {
    setForm({
      name: '',
      categoryName: '',
      quantity: '',
      unit: '',
      supplier: '',
      price: '',
      minimumStockLevel:'',
      expiryDate: '',
      active: true
    });

    setEditingId(null);
  };

  const getExpiryStatus = (expiryDate) => {
  if (!expiryDate) return "normal";

  const today = new Date();
  const exp = new Date(expiryDate);

  const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";        // đã hết hạn
  if (diffDays <= 7) return "warning";       // sắp hết hạn
  return "normal";
};
const getExpiryStyle = (status) => {
  switch (status) {
    case "expired":
      return { border: "2px solid red", background: "#ffe5e5" };

    case "warning":
      return { border: "2px solid orange", background: "#fff4e5" };

    default:
      return {};
  }
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
              <h1>Quản lý sản phẩm</h1>
              <p>Hệ thống quản lý</p>
              <p>Quản lý danh sách sản phẩm</p>
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
              <h3>Tổng sản phẩm</h3>
              <p>{products.length}</p>
            </div>

            <div className="stat-item">
              <h3>Đang hoạt động</h3>
              <p>{products.filter(p => p.active).length}</p>
            </div>
          </div>
        </div>

       {/* LIST */}
<div className="branch-management-section">
  <div className="section-header">
    <h2>Danh sách sản phẩm</h2>
    <div className="actions">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="add-btn" onClick={() => setShowModal(true)}>
        Thêm sản phẩm
      </button>
    </div>
  </div>

  <table className="customer-table">
    <thead>
      <tr>
        <th>Tên sản phẩm</th>
        <th>Danh mục</th>
        <th>Số lượng</th>
        <th>Đơn vị</th>
        <th>Giá</th>
        <th>Nhà cung cấp</th>
        <th>HSD</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.length > 0 ? (
        filteredProduct.map((p) => {
          console.log(p);
  const status = getExpiryStatus(p.expiryDate);
  const getExpiryStyle = (status) => {
  if (status === "expired") return { background: "#ffe5e5" };
  if (status === "warning") return { background: "#fff4e5" };
  return {};
};
  return (
    <tr key={p._id } style={getExpiryStyle(status)}>

      <td><strong>{p.name || ""}</strong></td>

      <td>{p.categoryName || ""}</td>

      <td>{Number(p.quantity || 0)}</td>

      <td>{p.unit || ""}</td>

      <td>{Number(p.price || 0).toLocaleString("vi-VN")} đ</td>

      <td>{p.supplier || ""}</td>

      <td>
        {p.expiryDate
          ? new Date(p.expiryDate).toLocaleDateString("vi-VN")
          : "—"}
      </td>

      {/* 🔥 BADGE trạng thái */}
      <td>
        {status === "expired" && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            ❌ Hết hạn
          </span>
        )}

        {status === "warning" && (
          <span style={{ color: "orange", fontWeight: "bold" }}>
            ⚠ Sắp hết hạn
          </span>
        )}
      </td>

      <td>
        <div className="actions">
          <button onClick={() => handleEdit(p)}>Sửa</button>
          <button onClick={() => handleDelete(p._id )}>
            Xoá
          </button>
        </div>
      </td>

    </tr>
  );
})
      ) : (
        <tr>
          <td colSpan={8} style={{ textAlign: "center", padding: "24px", color: "#999" }}>
            Không có sản phẩm nào
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
            <h3>Thêm sản phẩm</h3>
            <button onClick={() => setShowModal(false)}>×</button>
          </div>

          <div className="modal-grid">
            <label>
              Tên sản phẩm *
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label>
              Danh mục *
              <select name ="categoryName"
                  value={form.categoryName}
                  onChange={handleChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
            </label>

            <label>
              Nhà cung cấp *
              <input name="supplier" value={form.supplier} onChange={handleChange} />
            </label>

            <label>
              Số lượng *
              <input  name="quantity" value={form.quantity} onChange={handleChange} />
            </label>

            <label>
              Đơn vị
               <select name="unit"
                value={form.unit}
                onChange={handleChange}>
                  <option value="">Chọn đơn vị</option>
                  <option value="cái">cái</option>
                  <option value="hộp">Hộp</option>
                  <option value="chai">Chai</option>
                  <option value="lọ">Lọ</option>
                  <option value="túi">Túi</option>
                  <option value="kg">Kg</option>
                  <option value="lít">Lít</option>
                </select>
            </label>

            <label>
              Mức tồn kho tối thiểu
              <input type="number" name="minimumStockLevel" value={form.minimumStockLevel} onChange={handleChange} />
            </label>

            <label>
              Giá 
              <input  name="price" value={form.price} onChange={handleChange} />
            </label>
            <label>
                Hạn sử dụng
               <input
                type="date"
                name="expiryDate"
                value={form.expiryDate || ""}
                onChange={handleChange}
                />
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

export default Products;