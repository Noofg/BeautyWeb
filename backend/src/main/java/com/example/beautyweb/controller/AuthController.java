package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.entity.User;
import com.example.beautyweb.security.JwtService;
import com.example.beautyweb.service.UserService;
import com.example.beautyweb.dto.request.LoginRequest;
import com.example.beautyweb.dto.request.AdminCreateUserRequest;
import com.example.beautyweb.dto.request.UserRegisterRequest;


import java.util.Map;

@RestController
@RequestMapping("/api/auth")
 //@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
@Autowired
private JwtService jwtService;
    @PostMapping("/registerCustomer")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest request) {
        try {
            User user = userService.registerCustomer(request);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    @PostMapping("/adminRegisterCustomer")
    public ResponseEntity<?> createUser(@RequestBody AdminCreateUserRequest request) {
        try {
             System.out.println("REQUEST: " + request.getEmail()); // debug

            User user = userService.createUserByAdmin(request);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
          User user = userService.findByEmail(request.getEmail());

    // ❌ Sai tài khoản
    if (user == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Email không tồn tại"));
    }

    // ❌ Sai mật khẩu
   if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", "Sai mật khẩu"));
}

    // ✅ Tạo token
    String token = jwtService.generateToken(user.getEmail(), user.getRole());

    // ❗ Ẩn password
    user.setPassword(null);

    // ✅ Trả về đầy đủ cho frontend
    return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(),
            "user", user
    ));
    }

    @GetMapping("/users")
    public ResponseEntity<java.util.List<User>> getAllUsers() {
        java.util.List<User> users = userService.getAllUsers();
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }
    
}
