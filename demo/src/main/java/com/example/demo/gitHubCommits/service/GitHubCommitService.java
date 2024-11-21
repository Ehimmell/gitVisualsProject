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
    public List<List<Set<String>>> getAllCommits(String owner, String repo) throws IOException {

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

    //Method to format each commit by its categories of metadata
    private static @NotNull List<List<Set<String>>> formatCommits(List<String> commits) {
        
        //Create a list of sets that will contain the desired data for each commit given in the input
        List<List<Set<String>>> commitsMeta = new ArrayList<>();

        //Parse each commit
        for (String commit : commits) {
            
            //Split on commas to separate the metadata
            String[] commitSplit = commit.split(",");

            //Categorize the metadata into sets
            List<Set<String>> commitMeta = classifyMeta(commitSplit);
            //Add the complete list of desired metadata
            commitsMeta.add(commitMeta);
        }
        
        //Return the list of desired metadata for each commit
        return commitsMeta;
    }

    //Method to categorize the metadata of each commit
    private static @NotNull List<Set<String>> classifyMeta(String[] commitSplit) {

        //Make a list for all categorizations
        List<Set<String>> commitMeta = new ArrayList<>();

        //Create a set for the commit message
        Set<String> commitMessage = new HashSet<>();

        //Add the commit message to the set, and classify as message by adding "message"
        commitMessage.add("message");
        commitMessage.add(commitSplit[0]);

        //Add the commit message to the list of metadata
        commitMeta.add(commitMessage);

        //Create a list of the desired metadata to look for in each commit
        List<String> desiredMetadata = new ArrayList<>();
        desiredMetadata.add("url\":");
        desiredMetadata.add("author\":");
        desiredMetadata.add("commit\":");

        //Parse over each piece of desired metadata
        for (String desiredMeta : desiredMetadata) {

            //Create a set for the piece of desired metadata
            Set<String> thisMeta = getStrings(commitSplit, desiredMeta);

            /*If the currently looped piece of desired metadata was found, add it to the list of metadata
            for the current commit*/
            if(!thisMeta.isEmpty())
                commitMeta.add(thisMeta);
        }

        //Return the list of metadata for the current commit
        return commitMeta;
    }

    //Method to check for a desired metadata in a commit
    private static @NotNull Set<String> getStrings(String[] commitSplit, String desiredMeta) {
        Set<String> thisMeta = new HashSet<>();

        //Classify the desired meta list by adding the desired piece format to the set
        thisMeta.add(desiredMeta);

        //Parse over each piece of desired metadata in the commit, minus the message
        for (int j = 1; j < commitSplit.length; j++) {

            //Define the current piece of metadata being checking
            String meta = commitSplit[j];

            /*If the current piece matches the format of the current desired and is not a
            supplementary url(denoted by _url), add it to the current set of desired metadata*/
            if (meta.contains(desiredMeta) && !meta.contains("_url")) {
                thisMeta.add(meta);
            }

        }
        return thisMeta;
    }
}