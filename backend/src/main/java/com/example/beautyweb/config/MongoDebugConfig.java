package com.example.beautyweb.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDebugConfig {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void checkDB() {
        System.out.println("🔥 DATABASE: " + mongoTemplate.getDb().getName());
    }
}