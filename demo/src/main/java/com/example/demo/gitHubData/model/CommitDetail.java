package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommitDetail {

    private Author author;

    private Author committer;

    private String message;

    private Tree tree;

    private String url;

    private Verification verification;

    private int comment_count;
}
