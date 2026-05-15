package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repo;

    public List<Customer> getAll() {
        return repo.findAll();
    }

    public Customer save(Customer customer) {
        return repo.save(customer);
    }
    public void delete(Long id) {
        repo.deleteById(id);
    }
}