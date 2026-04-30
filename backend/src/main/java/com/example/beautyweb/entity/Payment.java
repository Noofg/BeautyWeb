package com.example.beautyweb.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    private String appointmentId;
    private String customerId;
    private String userId;

    // Dịch vụ
    private String serviceName;
    private double originalAmount;   // giá gốc

    // Voucher
    private String voucherCode;
    private double discountAmount;   // số tiền được giảm

    // Điểm tích lũy dùng
    private int pointsUsed;
    private double pointsDiscount;   // quy đổi điểm → tiền (1 điểm = 1000đ)

    // Tổng
    private double finalAmount;      // = originalAmount - discountAmount - pointsDiscount

    // Thanh toán
    private String paymentMethod;    // CASH / TRANSFER
    private LocalDateTime paidAt;
    private String status;           // SUCCESS / FAILED

    public Payment() {}

    // ===== Getters & Setters =====
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAppointmentId() { return appointmentId; }
    public void setAppointmentId(String appointmentId) { this.appointmentId = appointmentId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public double getOriginalAmount() { return originalAmount; }
    public void setOriginalAmount(double originalAmount) { this.originalAmount = originalAmount; }

    public String getVoucherCode() { return voucherCode; }
    public void setVoucherCode(String voucherCode) { this.voucherCode = voucherCode; }

    public double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(double discountAmount) { this.discountAmount = discountAmount; }

    public int getPointsUsed() { return pointsUsed; }
    public void setPointsUsed(int pointsUsed) { this.pointsUsed = pointsUsed; }

    public double getPointsDiscount() { return pointsDiscount; }
    public void setPointsDiscount(double pointsDiscount) { this.pointsDiscount = pointsDiscount; }

    public double getFinalAmount() { return finalAmount; }
    public void setFinalAmount(double finalAmount) { this.finalAmount = finalAmount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public LocalDateTime getPaidAt() { return paidAt; }
    public void setPaidAt(LocalDateTime paidAt) { this.paidAt = paidAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}