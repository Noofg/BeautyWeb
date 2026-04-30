package com.example.beautyweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.beautyweb.entity.Appointment;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByUserId(String userId);
    List<Appointment> findByEmail(String email);
    List<Appointment> findByAppointmentDateBetween(
    LocalDateTime start,
    LocalDateTime end
);
}
