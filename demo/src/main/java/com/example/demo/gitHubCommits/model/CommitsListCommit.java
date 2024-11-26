package com.example.demo.gitHubCommits.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class CommitsListCommit {

    @Getter
    @Setter
    private String sha;

    @Getter
    @Setter
    private String node_id;

    @Getter
    @Setter
    private String html_url;

    @Getter
    @Setter
    private Author author;

    @Getter
    @Setter
    private Author commiter;

    @Getter
    @Setter
    private Tree tree;

    @Getter
    @Setter
    private String message;

    @Getter
    @Setter
    private List<Parent> parents;

    @Getter
    @Setter
    private Verification verification;
}