package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    public List<Order> getAll() {
        return repo.findAll();
    }

    public Order save(Order order) {
        return repo.save(order);
    }
    public void delete(Long id) {
        repo.deleteById(id);
    }
}