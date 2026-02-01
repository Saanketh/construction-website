package com.construction.constructionwebsite.controller;

import com.construction.constructionwebsite.model.Project;
import com.construction.constructionwebsite.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }
    
    @GetMapping("/category/{category}")
    public List<Project> getProjectsByCategory(@PathVariable String category) {
        return projectRepository.findByCategoryIgnoreCase(category);
    }
}