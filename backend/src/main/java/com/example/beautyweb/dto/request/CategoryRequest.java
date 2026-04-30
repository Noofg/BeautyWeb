package com.example.beautyweb.dto.request;

public class CategoryRequest {

    private String name;
    private String description;
    private Boolean active;

    // ===== Constructor =====
    public CategoryRequest() {}

    // ===== Getter & Setter =====
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}