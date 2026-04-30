package com.example.beautyweb.dto.request;
import lombok.Data;

@Data
public class AdminCreateUserRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String role;
    private String branchId;
    private String address;
    private String dateOfBirth;
    private String gender;
    private String source;
    private String status;
    private String notes;
}