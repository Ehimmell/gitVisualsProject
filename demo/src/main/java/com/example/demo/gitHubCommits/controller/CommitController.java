package com.example.demo.gitHubCommits.controller;

import com.example.demo.gitHubCommits.service.GitHubCommitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommitController {

    private final GitHubCommitService gitHubCommitService;

    @Autowired
    public CommitController(GitHubCommitService service) {
        this.gitHubCommitService = service;
    }

    @GetMapping("/commits")
    public ResponseEntity<List<List<String>>> getCommitMessages(
            @RequestParam String owner,
            @RequestParam String repo) {
        try {
            List<String> commits = gitHubCommitService.getAllCommits(owner, repo);
            return ResponseEntity.ok(Collections.singletonList(commits));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
