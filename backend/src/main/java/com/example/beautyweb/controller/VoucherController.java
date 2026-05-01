package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.dto.request.VoucherRequest;
import com.example.beautyweb.entity.Voucher;
import com.example.beautyweb.service.VoucherService;

import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    // ===== CREATE =====
    @PostMapping("/create")
    public Voucher create(@RequestBody VoucherRequest request) {
        return voucherService.create(request);
    }

    // ===== GET ALL =====
    @GetMapping
    public List<Voucher> getAll() {
        return voucherService.getAll();
    }

    // ===== GET BY ID =====
    @GetMapping("/{id}")
    public Voucher getById(@PathVariable String id) {
        return voucherService.getById(id);
    }

    // ===== UPDATE =====
    @PutMapping("/{id}")
    public Voucher update(
            @PathVariable String id,
            @RequestBody VoucherRequest request) {
        return voucherService.update(id, request);
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        voucherService.delete(id);
        return "Deleted successfully";
    }

    // ===== APPLY =====
    @PostMapping("/apply")
    public double apply(
            @RequestParam String code,
            @RequestParam double amount,
            @RequestParam(required = false) String customerType) {

        return voucherService.apply(code, amount, customerType);
    }

    // ===== USE =====
    @PostMapping("/use")
    public String use(@RequestParam String code) {
        voucherService.use(code);
        return "Đã sử dụng voucher";
    }
}