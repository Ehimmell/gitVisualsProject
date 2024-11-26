package com.example.demo.gitHubCommits.model;

import lombok.Getter;
import lombok.Setter;

public class Parent {

    @Getter
    @Setter
    private String sha;

    @Getter
    @Setter
    private String url;

    @Getter
    @Setter
    private String html_url;
}
