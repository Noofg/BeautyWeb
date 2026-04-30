package com.example.beautyweb.controller;


import com.example.beautyweb.entity.Employee;
import com.example.beautyweb.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeSeRepository;

    // ✅ GET ALL
    @GetMapping
    public List<Employee> getAll() {
        return employeeSeRepository.findAll();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public Employee getById(@PathVariable String id) {
        return employeeSeRepository.findById(id).orElse(null);
    }

    // ✅ CREATE
    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeSeRepository.save(employee);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Employee update(@PathVariable String id, @RequestBody Employee newEmployee) {
        return employeeSeRepository.findById(id).map(dept -> {
            dept.setName(newEmployee.getName());
            dept.setEmail(newEmployee.getEmail());
            dept.setPhone(newEmployee.getPhone());
            dept.setPosition(newEmployee.getPosition());
            dept.setSalary(newEmployee.getSalary());
            dept.setStartDate(newEmployee.getStartDate());
            dept.setStatus(newEmployee.getStatus());
            dept.setBranches(newEmployee.getBranches());
            return employeeSeRepository.save(dept);
        }).orElse(null);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        employeeSeRepository.deleteById(id);
        return "Deleted successfully";
    }

    // ✅ SEARCH
    @GetMapping("/search")
    public List<Employee> search(@RequestParam String keyword) {
        return employeeSeRepository.findByNameContainingIgnoreCase(keyword);
    }
}