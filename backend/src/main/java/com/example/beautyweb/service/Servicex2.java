package com.example.beautyweb.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beautyweb.dto.request.ServiceRequest;
import com.example.beautyweb.entity.ServiceEntity;
import com.example.beautyweb.repository.ServiceRepository;

import java.util.List;

@Service
public class Servicex2 {
     @Autowired
    private ServiceRepository repository;

    public ServiceEntity create(ServiceEntity s) {
        return repository.save(s);
    }

    public List<ServiceEntity> getAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    public ServiceEntity getById(String id) {
    return repository.findById(id).orElse(null);
}

public ServiceEntity update(String id, ServiceRequest request) {
    return repository.findById(id).map(s -> {
        s.setName(request.getName());
        s.setDescription(request.getDescription());
        s.setImage(request.getImage());
        s.setPrice(request.getPrice());
        return repository.save(s);
    }).orElse(null);
}
}
