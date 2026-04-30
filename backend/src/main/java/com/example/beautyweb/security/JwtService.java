package com.example.beautyweb.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import com.example.beautyweb.entity.Role;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // dùng secret Base64 (QUAN TRỌNG)
    private final String SECRET = "my-super-secret-key-my-super-secret-key-123456";
    private Key getSigningKey() {
    return Keys.hmacShaKeyFor(SECRET.getBytes());
}

    public String generateToken(String email, Role role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role.name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}