package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.model.BranchesListBranch;
import com.example.demo.gitHubData.model.CommitsListCommit;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GitHubMultiService extends GitHubService {

    public GitHubMultiService(GitHubProperties gitHubProperties) {
        super(gitHubProperties);
    }

    public CommitsListCommit[] getAllCommits(String owner, String repo) throws IOException {
        return getAll(owner, repo, "commits", CommitsListCommit[].class);
    }

    public BranchesListBranch[] getAllBranches(String owner, String repo) throws IOException {
        return getAll(owner, repo, "branches", BranchesListBranch[].class);
    }

}
