package com.example.beautyweb.repository;

import com.example.beautyweb.entity.Branch;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BranchRepository extends MongoRepository<Branch, String> {
}
