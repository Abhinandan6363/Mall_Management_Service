package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Order;
import com.example.demo.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService service;

    @GetMapping
    public List<Order> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Order add(@RequestBody Order order) {
        order.setOrderDate(LocalDateTime.now());
        return service.save(order);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        service.delete(id);
    }
}