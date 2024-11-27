package com.example.demo.gitHubData.controller;

import com.example.demo.gitHubData.model.FullBranch;
import com.example.demo.gitHubData.service.GitHubSingleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BranchController {
    private final GitHubSingleService gitHubSingleService;

    @Autowired
    public BranchController(GitHubSingleService service) {
        this.gitHubSingleService = service;
    }

    @GetMapping("/branch")
    public ResponseEntity<FullBranch> getBranch(
            @RequestParam String owner,
            @RequestParam String repo,
            @RequestParam String branch) {
        try {
            FullBranch responseBranch = gitHubSingleService.getBranch(owner, repo, branch);
            return ResponseEntity.ok(responseBranch);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
