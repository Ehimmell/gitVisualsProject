package com.example.demo.gitHubCommits.service;

import com.example.demo.gitHubCommits.config.GitHubProperties;
import com.example.demo.gitHubCommits.model.Commit;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class GitHubCommitService {

    // Properties for the request returned by the GitHub API
    private final GitHubProperties gitHubProperties;

    // The client for the request
    private final OkHttpClient client;

    /* *** Constructor *** */

    public GitHubCommitService(GitHubProperties gitHubProperties) {
        this.gitHubProperties = gitHubProperties;
        this.client = new OkHttpClient();
    }

    /* *** Main Method *** */
    public Commit[] getAllCommits(String owner, String repo) throws IOException {
        // Set the username and repo name
        gitHubProperties.setUsername(owner);
        gitHubProperties.setRepoName(repo);
        gitHubProperties.setToken(System.getenv("GHP"));

        // Build the request URL
        String template = "https://api.github.com/repos/%s/%s/commits";
        String full = String.format(template, gitHubProperties.getUsername(), gitHubProperties.getRepoName());

        // Build the request
        Request request = new Request.Builder()
                .url(full)
                .addHeader("Authorization", "token " + gitHubProperties.getToken())
                .addHeader("Accept", "application/vnd.github.v3+json")
                .build();

        // Execute the request
        try (Response response = client.newCall(request).execute()) {
            Gson gson = new Gson();

            // Read the response body once
            ResponseBody responseBody = response.body();
            if (responseBody == null) {
                throw new IOException("Response body is null");
            }

            // Read the response body as a string
            String responseBodyString = responseBody.string();

            // Print the response body for logging
            System.out.println(responseBodyString);

            // Check if the response is successful
            if (response.isSuccessful()) {
                // Parse the response body string as an array of Commit objects
                return gson.fromJson(responseBodyString, Commit[].class);
            } else {
                // Parse the error response body to get more details
                JsonObject errorObject = gson.fromJson(responseBodyString, JsonObject.class);
                String message = errorObject.has("message") ? errorObject.get("message").getAsString() : "Unknown error";
                // Throw an exception or handle the error as needed
                throw new IOException("GitHub API request failed: " + message);
            }
        }
    }

}
