package com.example.demo.gitHubData.model;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BranchesListBranch {

    private String name;

    private BranchCommit commit;

    @SerializedName("protected")
    private boolean isProtected;
}
