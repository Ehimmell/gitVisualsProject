package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.model.CommitNode;
import com.example.demo.gitHubData.model.CommitsListCommit;
import com.example.demo.gitHubData.model.Parent;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class CommitTreeTraceService {
    private final GitHubMultiService gitHubMultiService;

    public CommitTreeTraceService(GitHubProperties gitHubProperties) {
        gitHubMultiService = new GitHubMultiService(gitHubProperties);
    }

    private List<CommitNode> makeTree(Map<String, List<String>> parentMap, String startSha) {
        List<CommitNode> res = new ArrayList<>();

        Set<String> vis = new HashSet<>();

        int startDepth = 0;

        treeHelper(startSha, parentMap, res, startDepth, vis);

        return res;
    }

    private void treeHelper(String sha, Map<String, List<String>> parentMap, List<CommitNode> res, int depth, Set<String> vis) {
        if(vis.contains(sha) || sha.isEmpty())
            return;

        vis.add(sha);

        List<String> parents = parentMap.getOrDefault(sha, new ArrayList<>());

        CommitNode node = new CommitNode(sha, parents, depth);

        res.add(node);

        for(String parentSha : parents) {
            treeHelper(parentSha, parentMap, res, depth + 1, vis);
        }
    }

    public List<CommitNode> getCommitTreeTrace(String owner, String repo) throws IOException {

        CommitsListCommit[] commits = gitHubMultiService.getAllCommits(owner, repo);

        Map<String, List<String>> parentMap = new HashMap<>();

        String startSha = null;

        for(CommitsListCommit commit : commits) {
            if(startSha == null)
                startSha = commit.getSha();

            List<Parent> parents = commit.getParents();

            List<String> parentShas = new ArrayList<>();

            for(Parent parent: parents) {
                parentShas.add(parent.getSha());
            }

            parentMap.put(commit.getSha(), parentShas);
        }

        return makeTree(parentMap, startSha);
    }
}
