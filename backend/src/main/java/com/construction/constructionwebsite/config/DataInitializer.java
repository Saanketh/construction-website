package com.construction.constructionwebsite.config;

import com.construction.constructionwebsite.model.Project;
import com.construction.constructionwebsite.model.Service;
import com.construction.constructionwebsite.repository.ProjectRepository;
import com.construction.constructionwebsite.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            initializeProjects();
        }
        
        if (serviceRepository.count() == 0) {
            initializeServices();
        }
    }
    
    private void initializeProjects() {
        Project project1 = new Project(
            "Modern Office Building",
            "A state-of-the-art office building with modern architecture and sustainable design features.",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "Commercial",
            "2023-12"
        );
        
        Project project2 = new Project(
            "Residential Complex",
            "Luxury residential complex with 50+ units, swimming pool, and modern amenities.",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "Residential",
            "2023-10"
        );
        
        Project project3 = new Project(
            "Shopping Mall",
            "Large shopping mall with 200+ stores, food court, and entertainment facilities.",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "Commercial",
            "2023-08"
        );
        
        Project project4 = new Project(
            "Bridge Construction",
            "Modern bridge construction connecting two major highways with advanced engineering.",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "Infrastructure",
            "2023-06"
        );
        
        projectRepository.saveAll(Arrays.asList(project1, project2, project3, project4));
    }
    
    private void initializeServices() {
        Service service1 = new Service(
            "Architecture Design",
            "We provide innovative architectural designs that blend functionality with aesthetics.",
            "https://cdn-icons-png.flaticon.com/512/609/609803.png"
        );
        
        Service service2 = new Service(
            "Construction Management",
            "Professional construction management services ensuring timely and budget-friendly completion.",
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        );
        
        Service service3 = new Service(
            "Renovation & Remodeling",
            "Complete renovation and remodeling services for residential and commercial properties.",
            "https://cdn-icons-png.flaticon.com/512/2920/2920278.png"
        );
        
        Service service4 = new Service(
            "Infrastructure Development",
            "Large-scale infrastructure development including roads, bridges, and utilities.",
            "https://cdn-icons-png.flaticon.com/512/1021/1021971.png"
        );
        
        Service service5 = new Service(
            "Project Planning",
            "Comprehensive project planning and feasibility studies for construction projects.",
            "https://cdn-icons-png.flaticon.com/512/3145/3145765.png"
        );
        
        Service service6 = new Service(
            "Quality Inspection",
            "Thorough quality inspection and assurance services throughout the construction process.",
            "https://cdn-icons-png.flaticon.com/512/1791/1791330.png"
        );
        
        serviceRepository.saveAll(Arrays.asList(service1, service2, service3, service4, service5, service6));
    }
}