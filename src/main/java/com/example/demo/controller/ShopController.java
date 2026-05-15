package com.example.demo.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Shop;
import com.example.demo.service.ShopService;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin("*")
public class ShopController {

    @Autowired
    private ShopService service;

    @GetMapping
    public List<Shop> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Shop add(@RequestBody Shop shop) {
        return service.save(shop);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
    @PutMapping("/{id}")
    public Shop update(@PathVariable Long id, @RequestBody Shop shop) {
        shop.setId(id);
        return service.save(shop);
    }
    
}