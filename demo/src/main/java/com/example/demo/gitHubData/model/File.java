package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

public class File {

    @Getter
    @Setter
    private String sha;

    @Getter
    @Setter
    private String filename;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private int additions;

    @Getter
    @Setter
    private int deletions;

    @Getter
    @Setter
    private int changes;

    @Getter
    @Setter
    private String blob_url;

    @Getter
    @Setter
    private String raw_url;

    @Getter
    @Setter
    private String contents_url;

    @Getter
    @Setter
    private String patch;
}
