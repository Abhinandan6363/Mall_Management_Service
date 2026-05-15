package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping
    public List<Customer> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Customer add(@RequestBody Customer customer) {
        return service.save(customer);
    }

    // 🔥 ADD THIS
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        service.delete(id);
    }
}