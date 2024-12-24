package com.example.demo.gitHubData.service;
import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.model.FullCommit;
import com.example.demo.gitHubData.model.Parent;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GitHubParentTraceService extends GitHubService {

    public GitHubParentTraceService(GitHubProperties gitHubProperties) {
        super(gitHubProperties);
    }

    public List<Parent> getParentTrace(String owner, String repo, String sha) throws IOException {
        setProperties(gitHubProperties, owner, repo);

        String format = "https://api.github.com/repos/%s/%s/commits/%s";
        String full = String.format(format, gitHubProperties.getUsername(), gitHubProperties.getRepoName(), sha);

        Request request = makeRequest(full);

        Gson gson = new Gson();

        try(Response response = client.newCall(request).execute()) {

            ResponseBody responseBody = response.body();
            if(responseBody == null) {
                throw new IOException("Response body is null");
            }

            String responseBodyString = responseBody.string();

            if(response.isSuccessful()) {
                FullCommit commit = gson.fromJson(responseBodyString, FullCommit.class);

                return commit.getParents();
            } else {
                JsonObject error = gson.fromJson(responseBodyString, JsonObject.class);
                throw new IOException(error.get("message").getAsString());
            }
        }
    }
}
