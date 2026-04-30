package com.example.beautyweb.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;
    private String userId;
    private String userName;
    private String email;
    private String phone;
    private String service;
    private LocalDateTime appointmentDate;
    private String notes;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    public Appointment() {}

    public Appointment(String userId, String userName, String email, String phone, 
                     String service, LocalDateTime appointmentDate, String notes) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.appointmentDate = appointmentDate;
        this.notes = notes;
        this.status = "PENDING";
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
