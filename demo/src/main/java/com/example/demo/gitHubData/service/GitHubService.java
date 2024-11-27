package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;


@Service
public class GitHubService {

    protected GitHubProperties gitHubProperties;

    protected OkHttpClient client;

    public GitHubService(GitHubProperties gitHubProperties) {
        this.gitHubProperties = gitHubProperties;
        this.client = new OkHttpClient();
    }

    public void setProperties(@NotNull GitHubProperties gitHubProperties, String owner, String repo) {
        // Set the username and repo name
        gitHubProperties.setUsername(owner);
        gitHubProperties.setRepoName(repo);
        gitHubProperties.setToken(System.getenv("GHP"));
    }

    @NotNull
    public Request makeRequest(String url) {
        return new Request.Builder()
                .url(url)
                .addHeader("Authorization", "token " + gitHubProperties.getToken())
                .addHeader("Accept", "application/vnd.github.v3+json")
                .build();
    }
}
