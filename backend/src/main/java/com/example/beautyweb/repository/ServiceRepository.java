package com.example.beautyweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.beautyweb.entity.ServiceEntity;

public interface ServiceRepository extends MongoRepository<ServiceEntity, String> {
}