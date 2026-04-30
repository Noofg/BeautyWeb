package com.example.beautyweb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.beautyweb.entity.Department;

public interface DepartmentRepository extends MongoRepository<Department, String> {
     List<Department> findByNameContainingIgnoreCase(String name);
}