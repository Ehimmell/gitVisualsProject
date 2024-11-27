package com.example.demo.gitHubData.model;

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
    private CommitDetail commit;

    @Getter
    @Setter
    private List<Parent> parents;

    @Getter
    @Setter
    private String url;

    @Getter
    @Setter
    private String comments_url;

    @Getter
    @Setter
    private String html_url;
}