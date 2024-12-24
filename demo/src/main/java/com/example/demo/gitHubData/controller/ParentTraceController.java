package com.example.demo.gitHubData.controller;

import com.example.demo.gitHubData.model.Parent;
import com.example.demo.gitHubData.service.GitHubParentTraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ParentTraceController {

    private final GitHubParentTraceService gitHubParentTraceService;

    @Autowired
    public ParentTraceController(GitHubParentTraceService gitHubParentTraceService) {
        this.gitHubParentTraceService = gitHubParentTraceService;
    }

    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getParent(
            @RequestParam String owner,
            @RequestParam String repo,
            @RequestParam String sha) {
        try {
            List<Parent> parentTrace = gitHubParentTraceService.getParentTrace(owner, repo, sha);
            return ResponseEntity.ok(parentTrace);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
