package com.example.beautyweb.controller;

import com.example.beautyweb.entity.Department;
import com.example.beautyweb.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class DepartmentController{

    @Autowired
    private DepartmentRepository departmentRepository;

   
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable String id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentRepository.save(department);
    }

    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable String id, @RequestBody Department newDepartment) {
        return departmentRepository.findById(id).map(dept -> {
            dept.setName(newDepartment.getName());
            dept.setDepartmentHead(newDepartment.getDepartmentHead());
            dept.setDescription(newDepartment.getDescription());
            dept.setBudget(newDepartment.getBudget());
            dept.setState(newDepartment.getState());
            return departmentRepository.save(dept);
        }).orElse(null);
    }

    
    @DeleteMapping("/{id}")
    public String deleteDepartment(@PathVariable String id) {
        departmentRepository.deleteById(id);
        return "Deleted successfully";
    }
    @GetMapping("/search")
public List<Department> search(@RequestParam String keyword) {
    return departmentRepository.findByNameContainingIgnoreCase(keyword);
}
}