package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.google.gson.JsonObject;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import java.io.IOException;

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
                // Throw an exception or handle the error as needed
                throw new IOException("GitHub API request failed: " + message);
            }
        }
    }
}
