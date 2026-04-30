package com.example.beautyweb.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "departments")
public class Department {

    @Id
    private String id;

    private String name;
    private String departmentHead;
    private String description;
    private String budget;
    private String state;

    public Department() {}

    public Department(String name, String departmentHead, String description, String budget, String state) {
        this.name = name;
        this.departmentHead = departmentHead;
        this.description = description;
        this.budget = budget;
        this.state = state;
    }

    // Getter & Setter đầy đủ
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartmentHead() { return departmentHead; }
    public void setDepartmentHead(String departmentHead) { this.departmentHead = departmentHead; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
}