package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;

@Service
public class ShopService {

    @Autowired
    private ShopRepository repo;

    public List<Shop> getAll() {
        return repo.findAll();
    }

    public Shop save(Shop shop) {
        return repo.save(shop);
    }
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}