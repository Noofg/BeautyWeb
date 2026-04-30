package com.example.beautyweb.service;

import com.example.beautyweb.dto.request.PaymentRequest;
import com.example.beautyweb.entity.Appointment;
import com.example.beautyweb.entity.Customer;
import com.example.beautyweb.entity.Payment;
import com.example.beautyweb.repository.AppointmentRepository;
import com.example.beautyweb.repository.CustomerRepository;
import com.example.beautyweb.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    @Autowired private PaymentRepository paymentRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private CustomerRepository customerRepository;
    @Autowired private VoucherService voucherService;

    public Payment processPayment(PaymentRequest req) {

        Payment p = new Payment();
        p.setAppointmentId(req.getAppointmentId());
        p.setCustomerId(req.getCustomerId());
        p.setUserId(req.getUserId());
        p.setServiceName(req.getServiceName());
        p.setOriginalAmount(req.getOriginalAmount());
        p.setPaymentMethod(req.getPaymentMethod());
        p.setPaidAt(LocalDateTime.now());

        double discount = 0;
        double pointsDiscount = 0;

        // 1. Áp dụng voucher nếu có
        if (req.getVoucherCode() != null && !req.getVoucherCode().isEmpty()) {
            try {
                discount = voucherService.apply(
                    req.getVoucherCode(),
                    req.getOriginalAmount(),
                    null
                );
                voucherService.use(req.getVoucherCode()); // trừ lượt dùng
                p.setVoucherCode(req.getVoucherCode());
                p.setDiscountAmount(discount);
            } catch (RuntimeException e) {
                throw new RuntimeException("Voucher lỗi: " + e.getMessage());
            }
        }

        // 2. Áp dụng điểm nếu có (1 điểm = 1000đ)
        if (req.getPointsUsed() > 0) {
            Customer customer = customerRepository.findById(req.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

            int available = customer.getLoyaltyPoints() == null ? 0 : customer.getLoyaltyPoints();
            if (req.getPointsUsed() > available) {
                throw new RuntimeException("Không đủ điểm tích lũy");
            }

            pointsDiscount = req.getPointsUsed() * 1000.0;
            p.setPointsUsed(req.getPointsUsed());
            p.setPointsDiscount(pointsDiscount);
        }

        // 3. Tính tiền cuối
        double finalAmount = req.getOriginalAmount() - discount - pointsDiscount;
        p.setFinalAmount(Math.max(finalAmount, 0)); // không âm
        p.setStatus("SUCCESS");

        // 4. Lưu payment
        paymentRepository.save(p);

        // 5. Cập nhật customer
        customerRepository.findById(req.getCustomerId()).ifPresent(customer -> {
            customer.setVisitCount((customer.getVisitCount() == null ? 0 : customer.getVisitCount()) + 1);
            customer.setTotalSpent((customer.getTotalSpent() == null ? 0.0 : customer.getTotalSpent()) + p.getFinalAmount());

            // Cộng điểm mới (100k = 1 điểm)
            int earned = (int) (p.getFinalAmount() / 100000);
            // Trừ điểm đã dùng
            int current = customer.getLoyaltyPoints() == null ? 0 : customer.getLoyaltyPoints();
            customer.setLoyaltyPoints(current - req.getPointsUsed() + earned);

            customerRepository.save(customer);
        });

        // 6. Cập nhật appointment → COMPLETED
        appointmentRepository.findById(req.getAppointmentId()).ifPresent(appointment -> {
            appointment.setStatus("COMPLETED");
            appointmentRepository.save(appointment);
        });

        return p;
    }

    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    public List<Payment> getByCustomer(String customerId) {
        return paymentRepository.findByCustomerId(customerId);
    }
}