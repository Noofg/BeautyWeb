package com.example.beautyweb.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beautyweb.dto.request.VoucherRequest;
import com.example.beautyweb.entity.Voucher;
import com.example.beautyweb.repository.VoucherRepository;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    // ===== CREATE =====
    public Voucher create(VoucherRequest request) {

        Voucher v = new Voucher();

        v.setCode(request.getCode());
        v.setType(request.getType());
        v.setValue(request.getValue());
        v.setMinOrder(request.getMinOrder());
        v.setMaxDiscount(request.getMaxDiscount());
        v.setQuantity(request.getQuantity());

        v.setStartDate(request.getStartDate());
        v.setEndDate(request.getEndDate());

        v.setActive(request.isActive());
        v.setCustomerType(request.getCustomerType());
        v.setUsedCount(0);

        return voucherRepository.save(v);
    }

    // ===== GET ALL =====
    public List<Voucher> getAll() {
        return voucherRepository.findAll();
    }

    // ===== GET BY ID =====
    public Voucher getById(String id) {
        return voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy voucher"));
    }

    // ===== UPDATE =====
    public Voucher update(String id, VoucherRequest request) {

        Voucher v = getById(id);

        v.setCode(request.getCode());
        v.setType(request.getType());
        v.setValue(request.getValue());
        v.setMinOrder(request.getMinOrder());
        v.setMaxDiscount(request.getMaxDiscount());
        v.setQuantity(request.getQuantity());

        v.setStartDate(request.getStartDate());
        v.setEndDate(request.getEndDate());

        v.setActive(request.isActive());
        v.setCustomerType(request.getCustomerType());

        return voucherRepository.save(v);
    }

    // ===== DELETE =====
    public void delete(String id) {
        voucherRepository.deleteById(id);
    }

    // ===== APPLY (chỉ check + tính tiền) =====
    public double apply(String code, double orderAmount, String customerType) {

        Voucher v = voucherRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Voucher không tồn tại"));

        // check active
        if (!v.isActive()) {
            throw new RuntimeException("Voucher đã bị tắt");
        }

        // check date
        if (v.getStartDate() == null || v.getEndDate() == null) {
            throw new RuntimeException("Voucher thiếu ngày");
        }

        LocalDate today = LocalDate.now();
        LocalDate start = v.getStartDate();
        LocalDate end = v.getEndDate();

        if (today.isBefore(start) || today.isAfter(end)) {
            throw new RuntimeException("Voucher không còn hiệu lực");
        }

        // check quantity
        if (v.getUsedCount() >= v.getQuantity()) {
            throw new RuntimeException("Voucher đã hết lượt");
        }

        // check min order
        if (orderAmount < v.getMinOrder()) {
            throw new RuntimeException("Chưa đạt đơn tối thiểu");
        }

        // check customer type
        if (v.getCustomerType() != null &&
            (customerType == null ||
             !v.getCustomerType().equalsIgnoreCase(customerType))) {
            throw new RuntimeException("Không áp dụng cho bạn");
        }

        // tính giảm
        double discount;

        if ("PERCENT".equals(v.getType())) {
            discount = orderAmount * v.getValue() / 100;
            discount = Math.min(discount, v.getMaxDiscount());
        } else {
            discount = v.getValue();
        }

        return discount;
    }

    // ===== USE (trừ lượt sau khi thanh toán) =====
    public void use(String code) {
        Voucher v = voucherRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Voucher không tồn tại"));

        v.setUsedCount(v.getUsedCount() + 1);
        voucherRepository.save(v);
    }
}