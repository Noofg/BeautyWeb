package com.example.beautyweb.controller;

import com.example.beautyweb.entity.Branch;
import com.example.beautyweb.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branches")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "http://localhost:3000", "https://beauty-web-zeta.vercel.app", "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app" })
public class BranchController {
    @Autowired
    private BranchService branchService;

    @GetMapping("/getListBranches")
    public ResponseEntity<List<Branch>> getAllBranches() {
        return ResponseEntity.ok(branchService.getAllBranches());
    }

    @PostMapping
    public ResponseEntity<Branch> createBranch(@RequestBody Branch branch) {
        Branch saved = branchService.createBranch(branch);
        return ResponseEntity.ok(saved);
    }
}
