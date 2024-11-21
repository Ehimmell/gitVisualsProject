package com.example.demo.gitHubCommits.service;

import com.example.demo.gitHubCommits.config.GitHubProperties;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

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
    public List<Set<String>> getAllCommits(String owner, String repo) throws IOException {

        //Set the username and owner and the default gitHubProperties initialized above
        gitHubProperties.setUsername(owner);
        gitHubProperties.setRepoName(repo);

        //Make and format the template for the request url
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
        return formatCommits(new ArrayList<>(Arrays.asList(commits).subList(1, commits.length)));
    }

    private static @NotNull List<Set<String>> formatCommits(List<String> commits) {
        
        //Create a list of sets that will contain the desired data for each commit given in the input
        List<Set<String>> commitsMeta = new ArrayList<>();

        //Create a list of the desired metadata to look for in each commit
        List<String> desiredMetadata = new ArrayList<>();
        desiredMetadata.add("url\":");
        desiredMetadata.add("author\":");

        //Parse each commit
        for (String commit : commits) {
            
            //Split on commas to separate the metadata
            String[] commitSplit = commit.split(",");
            
            //Create a set to hold metadata meeting desired criteria
            Set<String> commitMeta = getStrings(commitSplit, desiredMetadata);
            //Add the complete list of desired metadata
            commitsMeta.add(commitMeta);
        }
        
        //Return the list of desired metadata for each commit
        return commitsMeta;
    }

    private static @NotNull Set<String> getStrings(String[] commitSplit, List<String> desiredMetadata) {
        Set<String> commitMeta = new HashSet<>();

        //Add the first piece as it is the commit message
        commitMeta.add(commitSplit[0]);

        //Parse over every other piece of metadata
        for (String metadataQuery : desiredMetadata) {
            //Parse over the format for every piece of desired metadata
            for (int j = 1; j < commitSplit.length; j++) {
                /*If a piece of metadata is formatted in a way the matches a piece of desired metadata,
                add it to the list. Also check to see if it contains _url as _url denotes an unwanted
                supplementary url.*/
                if (commitSplit[j].contains(metadataQuery) && !commitSplit[j].contains("_url")) {
                    commitMeta.add(commitSplit[j]);
                }
            }
        }
        return commitMeta;
    }
}