package com.construction.constructionwebsite.repository;

import com.construction.constructionwebsite.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    @Query("SELECT p FROM Project p WHERE LOWER(p.category) = LOWER(:category)")
    List<Project> findByCategoryIgnoreCase(@Param("category") String category);
}