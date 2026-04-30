package com.example.beautyweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.beautyweb.entity.Product;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    // ===== Tìm theo category =====
    List<Product> findByCategoryName(String categoryName);

    // ===== Tìm theo tên (search) =====
    List<Product> findByNameContainingIgnoreCase(String name);

    // ===== Sản phẩm còn hoạt động =====
    List<Product> findByActiveTrue();

    // ===== Sắp hết hàng =====
    List<Product> findByQuantityLessThanEqual(int quantity);

}