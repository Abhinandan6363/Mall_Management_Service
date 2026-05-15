package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Guest;
import com.example.demo.repository.GuestRepository;

@Service
public class GuestService {

    @Autowired
    private GuestRepository repo;

    public List<Guest> getAll() {
        return repo.findAll();
    }

    public Guest save(Guest guest) {
        return repo.save(guest);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}