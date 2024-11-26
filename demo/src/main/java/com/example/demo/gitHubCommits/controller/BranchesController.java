package com.example.demo.gitHubCommits.controller;

import com.example.demo.gitHubCommits.model.BranchesListBranch;
import com.example.demo.gitHubCommits.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class BranchesController {

    private final GitHubService gitHubCommitService;

    @Autowired
    public BranchesController(GitHubService service) {
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
