package com.example.beautyweb.repository;

import com.example.beautyweb.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

    // 🔍 search theo tên
    List<Employee> findByNameContainingIgnoreCase(String keyword);

    // 🔍 filter theo phòng ban
    List<Employee> findByDepartment(String department);
}