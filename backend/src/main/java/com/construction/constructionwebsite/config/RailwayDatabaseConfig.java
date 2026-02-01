package com.construction.constructionwebsite.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;

@Configuration
public class RailwayDatabaseConfig {
    
    private final Environment env;
    
    public RailwayDatabaseConfig(Environment env) {
        this.env = env;
    }
    
    @Bean
    public DataSource dataSource() {
        String databaseUrl = env.getProperty("DATABASE_URL");
        
        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            // Convert Railway DATABASE_URL format to JDBC URL
            databaseUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
            
            return DataSourceBuilder.create()
                .url(databaseUrl)
                .username(env.getProperty("DATABASE_USER", "railway"))
                .password(env.getProperty("DATABASE_PASSWORD", ""))
                .driverClassName("org.postgresql.Driver")
                .build();
        }
        
        // Fallback for local development
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://localhost:5432/railway")
            .username("railway")
            .password("")
            .driverClassName("org.postgresql.Driver")
            .build();
    }
}