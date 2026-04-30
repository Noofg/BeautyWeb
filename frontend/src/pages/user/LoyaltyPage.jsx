import React, { useEffect, useState } from "react";
import "../../css/Loyalty.css";
import { getCustomerByUserId, CustomerPointsApi   } from "../../api/CustomerApi";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
function LoyaltyPage() {
  const [points, setPoints] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  const [discount, setDiscount] = useState(0);
const { showModal } = useModal();
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await getCustomerByUserId(userId);
      setPoints(res.data.loyaltyPoints || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setUsePoint(value);

    // convert điểm → tiền
    setDiscount(value * 100);
  };

  const handleUsePoints = async () => {
    if (usePoint <= 0) {
      showModal("Nhập số điểm hợp lệ");
      return;
    }

    if (usePoint > points) {
      showModal("Không đủ điểm");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      await CustomerPointsApi  (userId, usePoint);

      showModal("Sử dụng điểm thành công!");

      setUsePoint("");
      setDiscount(0);
      loadProfile();
    } catch (err) {
      console.error(err);
      showModal("Lỗi khi sử dụng điểm");
    }
  };

  return (
    <div className="loyalty-page">
      <div className="loyalty-card">
        <h2>🎁 Điểm tích lũy</h2>

        <div className="points-box">
          <p>Điểm hiện tại</p>
          <h1>{points}</h1>
        </div>

        <div className="form-group">
          <label>Nhập điểm muốn sử dụng</label>
          <input
            type="number"
            value={usePoint}
            onChange={handleChange}
            placeholder="VD: 100"
          />
        </div>

        <div className="discount-box">
          <p>Giảm giá</p>
          <h3>{discount.toLocaleString()} VNĐ</h3>
        </div>

        <button className="btn-use" onClick={handleUsePoints}>
          Sử dụng điểm
        </button>
      </div>
    </div>
  );
}

export default LoyaltyPage;