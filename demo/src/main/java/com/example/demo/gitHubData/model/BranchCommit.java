package com.example.demo.gitHubData.model;

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
