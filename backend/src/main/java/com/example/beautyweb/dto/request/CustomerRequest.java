package com.example.beautyweb.dto.request;

public class CustomerRequest {

    private String userId;
    private String name;
    private String phone;
    private String address;
    private String gender;

    // ✅ thêm mới
    private int visitCount;
    private double totalSpent;
    private int loyaltyPoints;
    private String typeCustomer;
    private String notes;

    public CustomerRequest() {}

    // ===== GET SET =====

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    // ✅ NEW
    public int getVisitCount() { return visitCount; }
    public void setVisitCount(int visitCount) { this.visitCount = visitCount; }

    public double getTotalSpent() { return totalSpent; }
    public void setTotalSpent(double totalSpent) { this.totalSpent = totalSpent; }

    public int getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(int loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }

    public String getTypeCustomer() { return typeCustomer; }
    public void setTypeCustomer(String typeCustomer) { this.typeCustomer = typeCustomer; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}