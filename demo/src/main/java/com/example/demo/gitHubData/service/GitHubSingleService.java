package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.model.FullBranch;
import com.example.demo.gitHubData.model.FullCommit;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class GitHubSingleService extends GitHubService {

    public GitHubSingleService(GitHubProperties gitHubProperties) {
        super(gitHubProperties);
    }

    public <T> T get(String owner, String repo, String endpoint, String sha, Class<T> clazz) throws IOException {
        setProperties(gitHubProperties, owner, repo);

        String format = "https://api.github.com/repos/%s/%s/%s/%s";
        String full = String.format(format, gitHubProperties.getUsername(), gitHubProperties.getRepoName(), endpoint, sha);

        Request request = makeRequest(full);

        Gson gson = new Gson();

        try (Response response = client.newCall(request).execute()) {
            ResponseBody responseBody = response.body();
            if(responseBody == null) {
                throw new IOException("Response body is null");
            }

            String responseBodyString = responseBody.string();

            if(response.isSuccessful()) {
                return gson.fromJson(responseBodyString, clazz);
            } else {
                JsonObject error = gson.fromJson(responseBodyString, JsonObject.class);
                throw new IOException(error.get("message").getAsString());
            }
        }
    }

    public FullCommit getCommit(String owner, String repo, String sha) throws IOException {
        return get(owner, repo, "commits", sha, FullCommit.class);
    }

    public FullBranch getBranch(String owner, String repo, String name) throws IOException {
        return get(owner, repo, "branches", name, FullBranch.class);
    }
}
