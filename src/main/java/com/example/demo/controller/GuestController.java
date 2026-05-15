package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Guest;
import com.example.demo.service.GuestService;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin("*")
public class GuestController {

    @Autowired
    private GuestService service;

    @GetMapping
    public List<Guest> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Guest add(@RequestBody Guest guest) {
        guest.setVisitTime(LocalDateTime.now()); // auto time
        return service.save(guest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}