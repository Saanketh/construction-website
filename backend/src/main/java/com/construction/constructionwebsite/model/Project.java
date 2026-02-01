package com.construction.constructionwebsite.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "completion_date")
    private String completionDate;
    
    public Project() {}
    
    public Project(String title, String description, String imageUrl, String category, String completionDate) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.completionDate = completionDate;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getCompletionDate() { return completionDate; }
    public void setCompletionDate(String completionDate) { this.completionDate = completionDate; }
}