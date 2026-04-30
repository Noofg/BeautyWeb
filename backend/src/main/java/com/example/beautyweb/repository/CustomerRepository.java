package com.example.beautyweb.repository;

import com.example.beautyweb.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    List<Customer> findByNameContainingIgnoreCase(String name);
    Optional<Customer> findByUserId(String userId);
}