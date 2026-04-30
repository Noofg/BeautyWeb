package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.dto.request.CategoryRequest;
import com.example.beautyweb.entity.Category;
import com.example.beautyweb.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // CREATE
    @PostMapping
    public Category create(@RequestBody CategoryRequest request) {

    Category c = new Category();

    c.setName(request.getName());
    c.setDescription(request.getDescription());

    // nếu frontend không gửi active → mặc định true
    c.setActive(request.getActive() != null ? request.getActive() : true);

    return categoryService.create(c);
}

    // GET ALL
    @GetMapping
    public List<Category> getAll() {
        return categoryService.getAll();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        categoryService.delete(id);
        return "Deleted";
    }
}