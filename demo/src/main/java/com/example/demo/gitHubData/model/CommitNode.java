package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommitNode {

    public String sha;

    public List<String> parentShas;

    public int depth;

    public int breadth;

    public CommitNode(String sha, List<String> parentShas, int depth, int breadth) {
        this.sha = sha;

        this.parentShas = parentShas;

        this.depth = depth;

        this.breadth = breadth;
    }
}
