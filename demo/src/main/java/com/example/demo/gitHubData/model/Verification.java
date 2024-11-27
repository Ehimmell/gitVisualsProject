package com.example.demo.gitHubData.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Verification {

    private boolean verified;

    private String reason;

    private String signature;

    private String payload;

    private String verified_at;
}
