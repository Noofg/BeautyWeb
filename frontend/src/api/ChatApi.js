import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/chat`;

/**
 * Gửi message + history lên AI
 */
export const sendGuestMessage = async (message) => {
  try {
    const res = await axios.post(`${API_URL}/guest`, {
      message: message,
      history: []         // guest không có history
    });
    return res.data.reply; // ← trả về string, không phải object
  } catch (err) {
    if (err.response?.status === 429) {
      return "⚠️ Đang bận, vui lòng thử lại sau vài giây.";
    }
    return "Lỗi kết nối đến server.";
  }
};

// Chat khi đã đăng nhập (dùng sau)
export const sendMessage = async (userId, message, history) => {
  try {
    const res = await axios.post(`${API_URL}`, {
      userId,
      message,
      history
    });
    return res.data.reply;
  } catch (err) {
    if (err.response?.status === 429) {
      return "⚠️ Đang bận, vui lòng thử lại sau vài giây.";
    }
    return "Lỗi kết nối đến server.";
  }
};