package com.example.beautyweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beautyweb.entity.Department;
import com.example.beautyweb.repository.DepartmentRepository;
import com.example.beautyweb.dto.request.DepartmentRequest;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    public Department create(DepartmentRequest req) {
        Department d = new Department(
            req.getName(),
            req.getDepartmentHead(),
            req.getDescription(),
            req.getBudget(),
            req.getState()
        );

        return repository.save(d);
    }

    public List<Department> getAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    public Department update(String id, DepartmentRequest req) {
    Department d = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng ban"));

    d.setName(req.getName());
    d.setDepartmentHead(req.getDepartmentHead());
    d.setDescription(req.getDescription());
    d.setBudget(req.getBudget());
    d.setState(req.getState());

    return repository.save(d);
}
public List<Department> search(String keyword) {
    return repository.findByNameContainingIgnoreCase(keyword);
}
} 
    

