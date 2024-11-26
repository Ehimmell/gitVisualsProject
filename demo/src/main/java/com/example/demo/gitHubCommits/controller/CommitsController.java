package com.example.demo.gitHubCommits.controller;

import com.example.demo.gitHubCommits.model.CommitsListCommit;
import com.example.demo.gitHubCommits.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommitsController {

    private final GitHubService gitHubCommitService;

    @Autowired
    public CommitsController(GitHubService service) {
        this.gitHubCommitService = service;
    }

    @GetMapping("/commits")
    public ResponseEntity<List<CommitsListCommit[]>> getCommits(
            @RequestParam String owner,
            @RequestParam String repo) {
        try {
            CommitsListCommit[] commits = gitHubCommitService.getAllCommits(owner, repo);
            return ResponseEntity.ok(Collections.singletonList(commits));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
