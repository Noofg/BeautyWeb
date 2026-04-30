package com.example.beautyweb.controller;

import com.example.beautyweb.dto.request.PaymentRequest;
import com.example.beautyweb.entity.Payment;
import com.example.beautyweb.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequest request) {
        try {
            Payment payment = paymentService.processPayment(request);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAll() {
        return ResponseEntity.ok(paymentService.getAll());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Payment>> getByCustomer(@PathVariable String customerId) {
        return ResponseEntity.ok(paymentService.getByCustomer(customerId));
    }
}