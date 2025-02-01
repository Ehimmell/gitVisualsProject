package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class FullCommit extends CommitsListCommit {

    private Stats stats;

    private List<File> files;

    private Directory root;
}
