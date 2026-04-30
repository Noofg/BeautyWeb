package com.example.beautyweb.service;

import com.example.beautyweb.entity.Branch;
import com.example.beautyweb.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    public Branch createBranch(Branch branch) {
        if (branch.getStatus() == null || branch.getStatus().isEmpty()) {
            branch.setStatus("Hoạt động");
        }
        if (branch.getStaffCount() == null) {
            branch.setStaffCount(0);
        }
        if (branch.getCustomerCount() == null) {
            branch.setCustomerCount(0);
        }
        if (branch.getRevenue() == null || branch.getRevenue().isEmpty()) {
            branch.setRevenue("0");
        }
        return branchRepository.save(branch);
    }
}
