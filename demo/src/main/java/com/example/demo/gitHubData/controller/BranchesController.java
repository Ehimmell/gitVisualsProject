package com.example.demo.gitHubData.controller;

import com.example.demo.gitHubData.model.BranchesListBranch;
import com.example.demo.gitHubData.service.GitHubMultiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class BranchesController {

    private final GitHubMultiService gitHubCommitService;

    @Autowired
    public BranchesController(GitHubMultiService service) {
        this.gitHubCommitService = service;
    }

    @GetMapping("/branches")
    public ResponseEntity<BranchesListBranch[]> getBranches(
            @RequestParam String owner,
            @RequestParam String repo) {
        try {
            BranchesListBranch[] branches = gitHubCommitService.getAllBranches(owner, repo);
            return ResponseEntity.ok(branches);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
