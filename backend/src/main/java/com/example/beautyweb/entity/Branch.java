package com.example.beautyweb.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "branches")
public class Branch {

    @Id
    private String id;
    private String name;
    private String manager;
    private String address;
    private String phone;
    private String openHours;
    private String status;
    private Integer staffCount;
    private Integer customerCount;
    private String revenue;

    public Branch() {
    }

    public Branch(String name, String manager, String address, String phone, String openHours, String status, Integer staffCount, Integer customerCount, String revenue) {
        this.name = name;
        this.manager = manager;
        this.address = address;
        this.phone = phone;
        this.openHours = openHours;
        this.status = status;
        this.staffCount = staffCount;
        this.customerCount = customerCount;
        this.revenue = revenue;
    }

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

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOpenHours() {
        return openHours;
    }

    public void setOpenHours(String openHours) {
        this.openHours = openHours;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getStaffCount() {
        return staffCount;
    }

    public void setStaffCount(Integer staffCount) {
        this.staffCount = staffCount;
    }

    public Integer getCustomerCount() {
        return customerCount;
    }

    public void setCustomerCount(Integer customerCount) {
        this.customerCount = customerCount;
    }

    public String getRevenue() {
        return revenue;
    }

    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }
}
