package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class File {

    private String sha;

    private String filename;

    private String status;

    private int additions;

    private int deletions;

    private int changes;

    private String blob_url;

    private String raw_url;

    private String contents_url;

    private String patch;
}
