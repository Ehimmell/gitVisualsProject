package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FullBranch {

    private String name;

    private CommitsListCommit commit;
}
