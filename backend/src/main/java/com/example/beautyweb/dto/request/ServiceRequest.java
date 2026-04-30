package com.example.beautyweb.dto.request;

public class ServiceRequest {

    private String name;        // tên dịch vụ
    private String description; // mô tả
    private String image;       // url hình ảnh
    private Double price;       // giá

    public ServiceRequest() {}

    public ServiceRequest(String name, String description, String image, Double price) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    // ===== Getter / Setter =====

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}