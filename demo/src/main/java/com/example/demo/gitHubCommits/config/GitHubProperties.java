package com.example.demo.gitHubCommits.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "github-commits")
public class GitHubProperties {

    /* *** Properties *** */

    // The URL of the GitHub API
    private String url;

    // The username of the GitHub user who the repo belongs to
    private String username;

    // The name of the repo
    private String repoName;

    // The GitHub Personal Access Token used in the API request
    private String token;

    // The number of commits to display per page
    private int perPage;

    // The total number of commits in the repo
    private int totalCommits;

    /* *** Getters and Setters *** */

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRepoName() {
        return repoName;
    }

    public void setRepoName(String repoName) {
        this.repoName = repoName;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getTotalCommits() {
        return totalCommits;
    }

    public void setTotalCommits(int totalCommits) {
        this.totalCommits = totalCommits;
    }
}