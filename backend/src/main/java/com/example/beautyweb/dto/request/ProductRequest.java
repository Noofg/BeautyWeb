package com.example.beautyweb.dto.request;

import java.time.LocalDate;

public class ProductRequest {

    private String name;
    private String categoryName;

    private int quantity;
    private String unit;

    private double price;
    private String supplier;

    private LocalDate expiryDate;

    private int minimumStockLevel;
    private Boolean active;

    public ProductRequest(){}
    public ProductRequest(String name, String categoryName, int quantity, String unit, double price, String supplier, LocalDate expiryDate, int minimumStockLevel, Boolean active) {
        this.name = name;
        this.categoryName = categoryName;
        this.quantity = quantity;
        this.unit = unit;
        this.price = price;
        this.supplier = supplier;
        this.expiryDate = expiryDate;
        this.minimumStockLevel = minimumStockLevel;
        this.active = active;
    }

    // ===== GETTER & SETTER =====

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String categoryName() {
        return categoryName;
    }

    public String getCategoryName() {
    return categoryName;
}

public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
}

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getMinimumStockLevel() {
        return minimumStockLevel;
    }

    public void setMinimumStockLevel(int minimumStockLevel) {
        this.minimumStockLevel = minimumStockLevel;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}