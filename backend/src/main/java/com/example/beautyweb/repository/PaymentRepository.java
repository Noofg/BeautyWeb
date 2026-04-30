package com.example.beautyweb.repository;

import com.example.beautyweb.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByCustomerId(String customerId);
    List<Payment> findByAppointmentId(String appointmentId);
}