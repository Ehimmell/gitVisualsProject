package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

public class FullBranch {

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private CommitsListCommit commit;
}
