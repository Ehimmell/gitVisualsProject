package com.example.demo.gitHubCommits.model;

import lombok.Getter;
import lombok.Setter;

public class Author {

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String date;
}
