package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.entity.ServiceEntity;
import com.example.beautyweb.dto.request.ServiceRequest;
import com.example.beautyweb.service.Servicex2;

import java.util.List;

@RestController
@RequestMapping("/api/services")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
public class ServiceController {

    @Autowired
    private Servicex2 service;

    
    @PostMapping("/create")
    public ServiceEntity create(@RequestBody ServiceRequest request) {
        ServiceEntity s = new ServiceEntity();
        s.setName(request.getName());
        s.setDescription(request.getDescription());
        s.setImage(request.getImage());
        s.setPrice(request.getPrice());

        return service.create(s);
    }

  
    @GetMapping
    public List<ServiceEntity> getAll() {
        return service.getAll();
    }

   
    @GetMapping("/{id}")
    public ServiceEntity getById(@PathVariable String id) {
        return service.getById(id);
    }

  
    @PutMapping("/{id}")
    public ServiceEntity update(@PathVariable String id, @RequestBody ServiceRequest request) {
        return service.update(id, request);
    }

  
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        service.delete(id);
        return "Deleted successfully";
    }
}