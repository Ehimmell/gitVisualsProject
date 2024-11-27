package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FullCommit extends CommitsListCommit {

    @Getter
    @Setter
    private Stats stats;

    @Getter
    @Setter
    private List<File> files;
}
