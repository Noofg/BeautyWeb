package com.example.beautyweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.beautyweb.dto.request.ProductRequest;
import com.example.beautyweb.entity.Product;
import com.example.beautyweb.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class ProductController {

    @Autowired
    private ProductService productService;

    // ================= CREATE =================
    @PostMapping
    public Product create(@RequestBody ProductRequest request) {
        return productService.create(request);
    }

    // ================= GET ALL =================
    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }

    // ================= GET BY ID =================
    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return productService.getById(id);
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public Product update(
            @PathVariable String id,
            @RequestBody ProductRequest request) {
        return productService.update(id, request);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        productService.delete(id);
        return "Deleted successfully";
    }

    // ================= SEARCH =================
    @GetMapping("/search")
    public List<Product> search(@RequestParam String keyword) {
        return productService.search(keyword);
    }

    // ================= FILTER CATEGORY =================
    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(@PathVariable String categoryId) {
        return productService.getByCategory(categoryId);
    }

    // ================= LOW STOCK =================
    @GetMapping("/low-stock")
    public List<Product> lowStock(
            @RequestParam(defaultValue = "10") int threshold) {
        return productService.getLowStock(threshold);
    }

    // ================= HẾT HẠN =================
    @GetMapping("/expired")
    public List<Product> expired() {
        return productService.getExpired();
    }

    // ================= SẮP HẾT HẠN =================
    @GetMapping("/expiring-soon")
    public List<Product> expiringSoon(
            @RequestParam(defaultValue = "7") int days) {
        return productService.getExpiringSoon(days);
    }

    // ================= TỔNG GIÁ TRỊ KHO =================
    @GetMapping("/total-value")
    public double totalValue() {
        return productService.getTotalValue();
    }
}