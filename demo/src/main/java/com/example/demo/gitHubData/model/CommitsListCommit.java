package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CommitsListCommit {

    private String sha;

    private String node_id;

    private CommitDetail commit;

    private List<Parent> parents;

    private String url;

    private String comments_url;

    private String html_url;
}