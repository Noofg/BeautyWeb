package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.entity.Appointment;
import com.example.beautyweb.service.AppointmentService;
import com.example.beautyweb.service.CustomerService;
import com.example.beautyweb.dto.request.BookingRequest;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
//@CrossOrigin(origins = "http://localhost:3000")
 @CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private CustomerService customerService;

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestBody BookingRequest request) {
        try {
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            Appointment appointment = appointmentService.bookAppointment(userId, request);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping
public ResponseEntity<List<Appointment>> getAllAppointments() {
    try {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().build();
    }
}

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getUserAppointments(@PathVariable String userId) {
        try {
            List<Appointment> appointments = appointmentService.getUserAppointments(userId);
            return ResponseEntity.ok(appointments);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable String appointmentId) {
        try {
            Appointment appointment = appointmentService.getAppointmentById(appointmentId);
            if (appointment == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{appointmentId}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable String appointmentId) {
        try {
            Appointment appointment = appointmentService.cancelAppointment(appointmentId);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/date/{date}")
public ResponseEntity<List<Appointment>> getByDate(@PathVariable String date) {
    try {
        List<Appointment> list = appointmentService.getByDate(date);
        return ResponseEntity.ok(list);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}
@PutMapping("/{appointmentId}/complete")
public ResponseEntity<Appointment> completeAppointment(
        @PathVariable String appointmentId,
        @RequestParam double amountSpent) {
    try {
        Appointment appointment = appointmentService.completeAppointment(appointmentId, amountSpent);
        return ResponseEntity.ok(appointment);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().build();
    }
}
}
