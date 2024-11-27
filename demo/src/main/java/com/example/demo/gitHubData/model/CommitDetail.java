package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

public class CommitDetail {

    @Getter
    @Setter
    private Author author;

    @Getter
    @Setter
    private Author committer;

    @Getter
    @Setter
    private String message;

    @Getter
    @Setter
    private Tree tree;

    @Getter
    @Setter
    private String url;

    @Getter
    @Setter
    private Verification verification;

    @Getter
    @Setter
    private int comment_count;
}
