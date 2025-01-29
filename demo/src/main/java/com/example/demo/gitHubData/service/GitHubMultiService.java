package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.model.BranchesListBranch;
import com.example.demo.gitHubData.model.CommitsListCommit;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GitHubMultiService extends GitHubService {

    public GitHubMultiService(GitHubProperties gitHubProperties) {
        super(gitHubProperties);
    }

    public <T> T[] getAll(String owner, String repo, String endpoint, Class<T[]> clazz) throws IOException {
        setProperties(gitHubProperties, owner, repo);

        String template = "https://api.github.com/repos/%s/%s/%s";
        String full = String.format(template, gitHubProperties.getUsername(), gitHubProperties.getRepoName(), endpoint);

        Request request = makeRequest(full);

        Gson gson = new Gson();

        try (Response response = client.newCall(request).execute()) {

            // Read the response body once
            ResponseBody responseBody = response.body();
            if (responseBody == null) {
                throw new IOException("Response body is null");
            }

            // Read the response body as a string
            String responseBodyString = responseBody.string();

            // Check if the response is successful
            if (response.isSuccessful()) {
                // Parse the response body string as an array of Commit objects
                return gson.fromJson(responseBodyString, clazz);
            } else {
                // Parse the error response body to get more details
                JsonObject errorObject = gson.fromJson(responseBodyString, JsonObject.class);
                String message = errorObject.has("message") ? errorObject.get("message").getAsString() : "Unknown error";
                throw new IOException("GitHub API request failed: " + message);
            }
        }
    }

    public CommitsListCommit[] getAllCommits(String owner, String repo) throws IOException {
        return getAll(owner, repo, "commits", CommitsListCommit[].class);
    }

    public BranchesListBranch[] getAllBranches(String owner, String repo) throws IOException {
        return getAll(owner, repo, "branches", BranchesListBranch[].class);
    }

}
