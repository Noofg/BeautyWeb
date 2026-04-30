package com.example.beautyweb.service;

import com.example.beautyweb.dto.request.CustomerRequest;
import com.example.beautyweb.entity.Customer;
import com.example.beautyweb.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // ===== GET ALL =====
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    // ===== CREATE =====
    public Customer createCustomer(CustomerRequest req) {
        Customer customer = new Customer();

        customer.setUserId(req.getUserId());   // null nếu khách tại quầy
        customer.setName(req.getName());
        customer.setPhone(req.getPhone());
        customer.setAddress(req.getAddress());
        customer.setGender(req.getGender());

        // Mặc định khi tạo mới
        customer.setVisitCount(0);
        customer.setTotalSpent(0.0);
        customer.setLoyaltyPoints(0);
        customer.setCreatedAt(LocalDateTime.now());

        return customerRepository.save(customer);
    }

    // ===== UPDATE =====
    public Customer updateCustomer(String id, CustomerRequest req) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy customer"));

        // Chỉ cập nhật thông tin cơ bản, không đụng visitCount/totalSpent/loyaltyPoints
        customer.setName(req.getName());
        customer.setPhone(req.getPhone());
        customer.setAddress(req.getAddress());
        customer.setGender(req.getGender());

        return customerRepository.save(customer);
    }

    // ===== DELETE =====
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    // ===== SEARCH =====
    public List<Customer> searchCustomers(String keyword) {
        return customerRepository.findByNameContainingIgnoreCase(keyword);
    }

    // ===== GET BY USER ID =====
    public Customer getByUserId(String userId) {
        return customerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy customer"));
    }

    // ===== DÙNG ĐIỂM =====
    public Customer usePoints(String userId, int points) {
        Customer c = customerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy customer"));

        int currentPoints = c.getLoyaltyPoints() == null ? 0 : c.getLoyaltyPoints();
        if (currentPoints < points) {
            throw new RuntimeException("Không đủ điểm");
        }

        c.setLoyaltyPoints(currentPoints - points);
        return customerRepository.save(c);
    }

    // ===== CẬP NHẬT SAU KHI HOÀN THÀNH LỊCH HẸN =====
    public Customer updateAfterAppointment(String customerId, double amountSpent) {
        Customer c = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy customer"));

        // Tăng lượt đến
        c.setVisitCount((c.getVisitCount() == null ? 0 : c.getVisitCount()) + 1);

        // Cộng tổng chi
        c.setTotalSpent((c.getTotalSpent() == null ? 0.0 : c.getTotalSpent()) + amountSpent);

        // Cộng điểm tích lũy — cứ 100.000đ = 1 điểm
        int earnedPoints = (int) (amountSpent / 100000);
        c.setLoyaltyPoints((c.getLoyaltyPoints() == null ? 0 : c.getLoyaltyPoints()) + earnedPoints);

        return customerRepository.save(c);
    }
}