package com.example.beautyweb.service;
import java.time.LocalDate;
import com.example.beautyweb.dto.request.EmployeeRequest;
import com.example.beautyweb.entity.Employee;
import com.example.beautyweb.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // 📌 GET ALL
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    // 📌 GET BY ID
    public Employee getById(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // 📌 CREATE
    public Employee create(EmployeeRequest req) {
        Employee emp = new Employee();
        mapToEntity(emp, req);
        return employeeRepository.save(emp);
    }

    // 📌 UPDATE
    public Employee update(String id, EmployeeRequest req) {
        return employeeRepository.findById(id).map(emp -> {
            mapToEntity(emp, req);
            return employeeRepository.save(emp);
        }).orElse(null);
    }

    // 📌 DELETE
    public void delete(String id) {
        employeeRepository.deleteById(id);
    }

    // 📌 SEARCH
    public List<Employee> search(String keyword) {
        return employeeRepository.findByNameContainingIgnoreCase(keyword);
    }

    // 📌 MAPPING
    private void mapToEntity(Employee emp, EmployeeRequest req) {
        emp.setName(req.getName());
        emp.setPosition(req.getPosition());
        emp.setDepartment(req.getDepartment());
        emp.setPhone(req.getPhone());
        emp.setEmail(req.getEmail());
        emp.setSalary(req.getSalary());
        emp.setStartDate(LocalDate.parse(req.getStartDate()));
        emp.setStatus(req.getStatus());
        emp.setBranches(req.getBranches());
    }
}