package com.example.beautyweb.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")
public class Employee {

    @Id
    private String id;

    private String name;
    private String position;
    private String department;
    private String phone;
    private String email;
    private Double  salary;
    private LocalDate startDate;
    private String status;
    private String branches;

    
    public Employee() {}

    public Employee(String name, String position, String department,
                    String phone, String email, Double  salary,
                    LocalDate startDate, String status, String branches) {
        this.name = name;
        this.position = position;
        this.department = department;
        this.phone = phone;
        this.email = email;
        this.salary = salary;
        this.startDate = startDate;
        this.status = status;
        this.branches = branches;
    }

    // Getter & Setter

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

public String getBranches() {
    return branches;
}

public void setBranches(String branches) {
    this.branches = branches;
}
   
}