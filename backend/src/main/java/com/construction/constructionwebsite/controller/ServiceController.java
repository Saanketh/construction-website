package com.construction.constructionwebsite.controller;

import com.construction.constructionwebsite.model.Service;
import com.construction.constructionwebsite.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceController {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @GetMapping
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Service getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }
}