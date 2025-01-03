package com.example.demo.gitHubData.controller;

import com.example.demo.gitHubData.model.CommitNode;
import com.example.demo.gitHubData.service.CommitTreeTraceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TreeTraceController {

    private final CommitTreeTraceService commitTreeTraceService;

    @Autowired
    public TreeTraceController(CommitTreeTraceService commitTreeTraceService) {
        this.commitTreeTraceService = commitTreeTraceService;
    }

    @GetMapping("/tree")
    public ResponseEntity<List<CommitNode>> getTreeTrace(
            @RequestParam String owner,
            @RequestParam String repo) {
        try {
            List<CommitNode> treeTrace = commitTreeTraceService.getCommitTreeTrace(owner, repo);
            return ResponseEntity.ok(treeTrace);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
 }
