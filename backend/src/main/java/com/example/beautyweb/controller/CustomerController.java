package com.example.beautyweb.controller;

import com.example.beautyweb.dto.request.CustomerRequest;
import com.example.beautyweb.entity.Customer;
import com.example.beautyweb.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class CustomerController {

    
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAll() {
        try {
        return customerService.getAll();
    } catch (Exception e) {
         e.printStackTrace();
    throw e;
    }
    }

    @PostMapping("/create")
public Customer create(@RequestBody CustomerRequest req) {
    return customerService.createCustomer(req);
}
    @PutMapping("/{id}")
    public Customer update(@PathVariable String id, @RequestBody CustomerRequest req) {
        return customerService.updateCustomer(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        customerService.deleteCustomer(id);
    }

    @GetMapping("/search")
    public List<Customer> search(@RequestParam String keyword) {
        return customerService.searchCustomers(keyword);
    }
    @GetMapping("/profile/{userId}")
public Customer getProfile(@PathVariable String userId) {
    return customerService.getByUserId(userId);
}
@PostMapping("/use-points")
public Customer usePoints(@RequestParam String userId,
                          @RequestParam int points) {
    return customerService.usePoints(userId, points);
}
}