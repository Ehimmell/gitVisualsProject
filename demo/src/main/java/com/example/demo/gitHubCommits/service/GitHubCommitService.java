package com.example.demo.gitHubCommits.service;

import com.example.demo.gitHubCommits.config.GitHubProperties;
import com.google.gson.Gson;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class GitHubCommitService {

    // Properties for the request returned by the GitHub API
    private final GitHubProperties gitHubProperties;

    // The client for the request
    private final OkHttpClient client;

    // The Gson object for the request
    private final Gson gson;

    /* *** Constructor *** */

    public GitHubCommitService(GitHubProperties gitHubProperties) {
        this.gitHubProperties = gitHubProperties;
        this.client = new OkHttpClient();
        this.gson = new Gson();
    }

    /* *** Main Method *** */
    public List<String> getAllCommits(String owner, String repo) throws IOException {

        //Set the username and owner and the default gitHubProperties initialized above
        gitHubProperties.setUsername(owner);
        gitHubProperties.setRepoName(repo);

        //Make and fomrat the template for the request url
        String template = "https://api.github.com/repos/%s/%s/commits";
        String full = String.format(template, gitHubProperties.getUsername(), gitHubProperties.getRepoName());

        //Build the request
        HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(full)).newBuilder();

        Request request = new Request.Builder()
                .url(urlBuilder.build())
                .addHeader("Authorization", "token " + gitHubProperties.getToken())
                .addHeader("Accept", "application/vnd.github.v3+json")
                .build();

        //Create a call for the request
        Call call = client.newCall(request);

        //Execute the call
        Response response = call.execute();

        //Check if the response is null
        assert response.body() != null;

        //Split the response into an array of commits
        String[] commits = response.body().string().split("\"message\":");

        //Return the list of commits, minus the first one, as it is metadata on the sha and node
        return new ArrayList<>(Arrays.asList(commits).subList(1, commits.length));
    }
}