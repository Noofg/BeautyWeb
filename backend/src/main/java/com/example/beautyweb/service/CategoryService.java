package com.example.beautyweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.beautyweb.entity.Category;
import com.example.beautyweb.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category create(Category c) {
        return categoryRepository.save(c);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public void delete(String id) {
        categoryRepository.deleteById(id);
    }
}