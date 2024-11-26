package com.example.demo.gitHubCommits.model;

import lombok.Getter;
import lombok.Setter;

public class BranchCommit {

    @Getter
    @Setter
    private String sha;

    @Getter
    @Setter
    private String url;
}
