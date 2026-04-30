import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Home.css";
import { getServices } from "../../api/ServiceApi";
import {  sendGuestMessage } from "../../api/ChatApi"; 

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  useEffect(() => {
  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadServices();
}, []);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (userId && userName && userRole === "CUSTOMER") {
      setUser({ id: userId, name: userName, role: userRole });
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };
  const handleSendMessage = async () => {
  if (loadingChat) return;
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);

  const currentInput = input;
  setInput("");
  setLoadingChat(true);

  // 🔥 gọi API đúng
  const reply = await sendGuestMessage(currentInput);

  const botMessage = { role: "bot", text: reply };
  setMessages((prev) => [...prev, botMessage]);

  setLoadingChat(false);
};
  return (
    <div className="home">

      {/* HEADER */}
      <header className="header">
        <div className="topbar">
          <span>0123 456 789</span>
          <span>info@thammy.vn</span>
          <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
        </div>

        <nav className="navbar">
          <h2 className="logo">Belle Beauté</h2>
          <ul>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Dịch vụ</li>
            <li>Thư viện</li>
            <li>Đánh giá</li>
            <li>Liên hệ</li>
          </ul>
          <div className="nav-actions">
            <button className="btn" onClick={() => navigate("/booking")}>Đặt lịch</button>
            {user && (
              <div className="user-menu-container">
                <button
                  className="user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="user-icon">👤</span>
                  <span className="user-name">{user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/dashboard");
                        setShowUserMenu(false);
                      }}
                    >
                      📊 Dashboard
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile");
                        setShowUserMenu(false);
                      }}
                    >
                      👤 Hồ sơ cá nhân
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/appointments");
                        setShowUserMenu(false);
                      }}
                    >
                      📅 Lịch hẹn
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/voucher");
                        setShowUserMenu(false);
                      }}
                    >
                      🎫 Ví voucher
                    </div>
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      🚪 Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            )}
            {!user && (
              <button className="btn-outline" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Nâng Niu Vẻ Đẹp Của Bạn</h1>
        <p>
          Trải nghiệm dịch vụ thẩm mỹ cao cấp với đội ngũ chuyên gia hàng đầu
        </p>
        <div className="hero-btns">
          <button className="btn" onClick={() => navigate("/booking")}>Đặt lịch ngay</button>
          <button className="btn-outline">Tìm hiểu thêm</button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>Về Belle Beauté</h2>
        <p>
          Belle Beauté là thẩm mỹ viện hàng đầu với hơn 15 năm kinh nghiệm trong
          ngành làm đẹp. Chúng tôi cam kết mang đến dịch vụ chất lượng cao với
          đội ngũ chuyên gia giàu kinh nghiệm và công nghệ hiện đại.
        </p>

        <div className="stats">
          <div>
            <h3>10,000+</h3>
            <p>Khách hàng hài lòng</p>
          </div>
          <div>
            <h3>15+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
          <div>
            <h3>50+</h3>
            <p>Dịch vụ chuyên nghiệp</p>
          </div>
          <div>
            <h3>4.9/5</h3>
            <p>Đánh giá trung bình</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
     {/* SERVICES */}
<section className="services">
  <h2>Dịch vụ của chúng tôi</h2>

  {loading ? (
    <p>Đang tải...</p>
  ) : (
    <div className="service-list">
      {services.length > 0 ? (
        services.map((s) => (
          <div className="card" key={s.id}>
            
            {/* IMAGE */}
            {s.image && (
              <img src={s.image} alt={s.name} className="service-img" />
            )}

            <h3>{s.name}</h3>
            <p>{s.description}</p>

            <span>
              Từ {s.price?.toLocaleString()}đ
            </span>
             <button
    className="booking-btn"
    onClick={() => navigate(`/booking/${s.id}`)}>
    Đặt lịch →
  </button>
          </div>
        ))
      ) : (
        <p>Chưa có dịch vụ</p>
      )}
    </div>
  )}
</section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <h2>Khách hàng nói gì</h2>

        <div className="review">
          <p>
            "Dịch vụ tuyệt vời, nhân viên chuyên nghiệp và không gian sang trọng."
          </p>
          <h4>Nguyễn Hương Giang</h4>
        </div>

        <div className="review">
          <p>
            "Chăm sóc da rất tốt, tôi sẽ tiếp tục sử dụng dịch vụ."
          </p>
          <h4>Trần Minh Anh</h4>
        </div>

        <div className="review">
          <p>
            "Massage cực kỳ thư giãn, rất đáng trải nghiệm."
          </p>
          <h4>Lê Thu Hà</h4>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <h2>Liên hệ</h2>

        <div className="contact-info">
          <p>📍 123 Nguyễn Huệ, Quận 1</p>
          <p>📞 0123 456 789</p>
          <p>📧 info@bellebeaute.vn</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Lời nhắn"></textarea>
          <button className="btn">Gửi</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2024 Belle Beauté. All rights reserved.</p>
      </footer>
      {/* CHAT BOT */}
<div className="chat-container">
  {/* Nút mở chat */}
  <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
    💬
  </button>

  {/* Box chat */}
  {showChat && (
    <div className="chat-box">
      <div className="chat-header">
        <span>Trợ lý AI</span>
        <button onClick={() => setShowChat(false)}>✖</button>
      </div>

      <div className="chat-body">
        {messages.length === 0 && (
          <p className="chat-welcome">Xin chào 👋 Bạn cần tư vấn gì?</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}

        {loadingChat && <p className="chat-loading">Đang trả lời...</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
       <button onClick={handleSendMessage} disabled={loadingChat}>
  {loadingChat ? "Đang gửi..." : "Gửi"}
</button>
      </div>
    </div>
  )}
</div>
    </div>

  );
  
}

export default Home;