package com.example.beautyweb.dto.request;

public class DepartmentRequest {

    private String name;
    private String departmentHead;
    private String description;
    private String budget;
    private String state;

    // Getter & Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartmentHead() {
        return departmentHead;
    }

    public void setDepartmentHead(String departmentHead) {
        this.departmentHead = departmentHead;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}