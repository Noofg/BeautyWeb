package com.example.beautyweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beautyweb.entity.Appointment;
import com.example.beautyweb.entity.User;
import com.example.beautyweb.dto.request.BookingRequest;
import com.example.beautyweb.repository.AppointmentRepository;
import com.example.beautyweb.repository.CustomerRepository;
import com.example.beautyweb.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository; 

    public Appointment bookAppointment(String userId, BookingRequest request) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (request.getService() == null || request.getService().isEmpty()) {
            throw new RuntimeException("Service is required");
        }

        if (request.getAppointmentDate() == null) {
            throw new RuntimeException("Appointment date is required");
        }

        Appointment appointment = new Appointment(
            userId,
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            request.getService(),
            request.getAppointmentDate(),
            request.getNotes()
        );

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getUserAppointments(String userId) {
        return appointmentRepository.findByUserId(userId);
    }

    public Appointment getAppointmentById(String appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    public Appointment cancelAppointment(String appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment == null) {
            throw new RuntimeException("Appointment not found");
        }
        appointment.setStatus("CANCELLED");
        return appointmentRepository.save(appointment);
    }
    public List<Appointment> getAllAppointments() {
    return appointmentRepository.findAll();
}
public List<Appointment> getByDate(String date) {
    LocalDate localDate = LocalDate.parse(date);
    return appointmentRepository.findByAppointmentDateBetween(
        localDate.atStartOfDay(),
        localDate.atTime(23,59,59)
    );
}
public Appointment completeAppointment(String appointmentId, double amountSpent) {
    // 1. Tìm appointment
    Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn"));

    // 2. Đổi status → COMPLETED
    appointment.setStatus("COMPLETED");
    appointmentRepository.save(appointment);

    // 3. Tìm customer theo userId → cập nhật
    customerRepository.findByUserId(appointment.getUserId())
            .ifPresent(customer -> {
                customer.setVisitCount((customer.getVisitCount() == null ? 0 : customer.getVisitCount()) + 1);
                customer.setTotalSpent((customer.getTotalSpent() == null ? 0.0 : customer.getTotalSpent()) + amountSpent);
                int earned = (int) (amountSpent / 100000);
                customer.setLoyaltyPoints((customer.getLoyaltyPoints() == null ? 0 : customer.getLoyaltyPoints()) + earned);
                customerRepository.save(customer);
            });

    return appointment;
}
}
