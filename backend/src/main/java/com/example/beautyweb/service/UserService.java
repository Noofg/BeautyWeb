package com.example.beautyweb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.beautyweb.entity.User;
import com.example.beautyweb.entity.Role;
import com.example.beautyweb.repository.UserRepository;
import com.example.beautyweb.dto.request.LoginRequest;
import com.example.beautyweb.dto.request.AdminCreateUserRequest;
import com.example.beautyweb.dto.request.UserRegisterRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
public User registerCustomer(UserRegisterRequest request) {

    if (userRepository.findByEmail(request.getEmail()) != null) {
        throw new RuntimeException("User already exists");
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    User user = new User(
        request.getName(),
        request.getEmail(),
        request.getPhone(),
        hashedPassword
    );

    // ✅ FIX QUAN TRỌNG
    user.setRole(Role.CUSTOMER);

    return userRepository.save(user);
}
   public User createUserByAdmin(AdminCreateUserRequest request) {
    if (userRepository.findByEmail(request.getEmail()) != null) {
        throw new RuntimeException("User already exists");
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    User user = new User(
        request.getName(),
        request.getEmail(),
        request.getPhone(),
        hashedPassword
    );

    // Role
    Role role = Role.CUSTOMER;
    if (request.getRole() != null) {
        role = Role.valueOf(request.getRole().toUpperCase());
    }
    user.setRole(role);

    // Extra fields
    user.setBranchId(request.getBranchId());
    user.setAddress(request.getAddress());
    user.setDateOfBirth(request.getDateOfBirth());
    user.setGender(request.getGender());
    user.setSource(request.getSource());
    user.setStatus(request.getStatus());
    user.setNotes(request.getNotes());

    return userRepository.save(user);
}

    public User login(LoginRequest request) {
        System.out.println("INPUT: " + request.getPassword());
        User user = userRepository.findByEmail(request.getEmail());
        System.out.println("HASH: " + user.getPassword());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        // Role is determined by the database, not by user input
        return user;
    }

    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }
   public User findByEmail(String email) {
    return userRepository.findByEmail(email);
}
}