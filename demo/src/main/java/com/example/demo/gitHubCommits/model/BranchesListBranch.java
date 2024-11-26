package com.example.demo.gitHubCommits.model;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

public class BranchesListBranch {

    @Setter
    @Getter
    private String name;

    @Setter
    @Getter
    private BranchCommit commit;

    @Getter
    @Setter
    @SerializedName("protected")
    private boolean isProtected;
}
