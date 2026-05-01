package com.example.beautyweb.service;

import com.example.beautyweb.dto.request.ProductRequest;
import com.example.beautyweb.entity.Product;
import com.example.beautyweb.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // ================= CREATE =================
    public Product create(ProductRequest request) {

        Product p = new Product();

        p.setName(request.getName());
        p.setCategoryName(request.getCategoryName());
        p.setQuantity(request.getQuantity());
        p.setUnit(request.getUnit());
        p.setPrice(request.getPrice());
        p.setSupplier(request.getSupplier());
        p.setExpiryDate(request.getExpiryDate());
        p.setMinimumStockLevel(request.getMinimumStockLevel());


        // default active
        p.setActive(request.getActive() != null ? request.getActive() : true);

        return productRepository.save(p);
    }

    // ================= GET ALL =================
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    // ================= GET BY ID =================
    public Product getById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }

    // ================= UPDATE =================
    public Product update(String id, ProductRequest request) {

        Product p = getById(id);

        p.setName(request.getName());
        p.setCategoryName(request.getCategoryName());
        p.setQuantity(request.getQuantity());
        p.setUnit(request.getUnit());
        p.setPrice(request.getPrice());
        p.setSupplier(request.getSupplier());
        p.setExpiryDate(request.getExpiryDate());
        p.setMinimumStockLevel(request.getMinimumStockLevel());

        if (request.getActive() != null) {
            p.setActive(request.getActive());
        }

        return productRepository.save(p);
    }

    // ================= DELETE =================
    public void delete(String id) {
        productRepository.deleteById(id);
    }

    // ================= SEARCH =================
    public List<Product> search(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // ================= FILTER CATEGORY =================
    public List<Product> getByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    // ================= LOW STOCK =================
    public List<Product> getLowStock(int threshold) {
        return productRepository.findByQuantityLessThanEqual(threshold);
    }

    // ================= HẾT HẠN =================
    public List<Product> getExpired() {
        LocalDate today = LocalDate.now();

        return productRepository.findAll()
                .stream()
                .filter(p -> p.getExpiryDate() != null &&
                             p.getExpiryDate().isBefore(today))
                .toList();
    }

    // ================= SẮP HẾT HẠN =================
    public List<Product> getExpiringSoon(int days) {
        LocalDate today = LocalDate.now();
        LocalDate future = today.plusDays(days);

        return productRepository.findAll()
                .stream()
                .filter(p -> p.getExpiryDate() != null &&
                             (p.getExpiryDate().isEqual(today) ||
                              (p.getExpiryDate().isAfter(today) &&
                               p.getExpiryDate().isBefore(future))))
                .toList();
    }

    // ================= TỔNG GIÁ TRỊ KHO =================
    public double getTotalValue() {
        return productRepository.findAll()
                .stream()
                .mapToDouble(p -> (p.getPrice() * p.getQuantity()))
                .sum();
    }
}