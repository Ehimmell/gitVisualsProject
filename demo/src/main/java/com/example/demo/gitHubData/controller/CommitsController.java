package com.example.demo.gitHubData.controller;

import com.example.demo.gitHubData.model.CommitsListCommit;
import com.example.demo.gitHubData.model.FullCommit;
import com.example.demo.gitHubData.service.GitHubMultiService;
import com.example.demo.gitHubData.service.GitHubSingleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CommitsController {

    private final GitHubMultiService gitHubMultiService;
    private final GitHubSingleService gitHubSingleService;

    @Autowired
    public CommitsController(GitHubMultiService gitHubMultiService, GitHubSingleService gitHubSingleService) {
        this.gitHubSingleService = gitHubSingleService;
        this.gitHubMultiService = gitHubMultiService;
    }

    @GetMapping("/commits")
    public ResponseEntity<List<CommitsListCommit[]>> getCommits(
            @RequestParam String owner,
            @RequestParam String repo) {
        try {
            CommitsListCommit[] commits = gitHubMultiService.getAllCommits(owner, repo);
            return ResponseEntity.ok(Collections.singletonList(commits));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/commit")
    public ResponseEntity<FullCommit> getCommit(
            @RequestParam String owner,
            @RequestParam String repo,
            @RequestParam String sha) {

        try {
            FullCommit commit = gitHubSingleService.getCommit(owner, repo, sha);
            return ResponseEntity.ok(commit);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
