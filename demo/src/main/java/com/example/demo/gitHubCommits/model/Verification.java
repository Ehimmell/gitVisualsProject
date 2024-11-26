package com.example.demo.gitHubCommits.model;

import lombok.Getter;
import lombok.Setter;

public class Verification {

    private boolean verified;

    @Getter
    @Setter
    private String reason;

    @Getter
    @Setter
    private String signature;

    @Getter
    @Setter
    private String payload;

    @Getter
    @Setter
    private String verified_at;
}
