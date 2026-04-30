package com.example.beautyweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.beautyweb.entity.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
}