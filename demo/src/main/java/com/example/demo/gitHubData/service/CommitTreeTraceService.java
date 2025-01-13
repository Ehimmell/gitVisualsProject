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

    // Use instance of GitHubMultiService to call for bulk commit info
    private final GitHubMultiService gitHubMultiService;

    public CommitTreeTraceService(GitHubProperties gitHubProperties) {
        gitHubMultiService = new GitHubMultiService(gitHubProperties);
    }

    //Helper method to add breadth and depth elements to commits in a given tree
    private List<CommitNode> makeTree(Map<String, List<String>> parentMap, String startSha) {

        //Map to track breadth(verticality) of tree
        Map<Integer, Integer> breadthLog = new HashMap<>();

        //List to store full tree
        List<CommitNode> res = new ArrayList<>();

        //Set to track processed commits
        Set<String> vis = new HashSet<>();

        //Starting depth, set into a variable for clarity
        int startDepth = 0;

        //Start recursive building
        treeHelper(startSha, parentMap, res, startDepth, vis, breadthLog);

        //Return tree list post recursion
        return res;
    }

    //Helper to makeTree for recursion and tree size processing
    private void treeHelper(String sha, Map<String, List<String>> parentMap, List<CommitNode> res, int depth, Set<String> vis, Map<Integer, Integer> breadthLog) {

        //If commit has already been processed, return
        if(vis.contains(sha) || sha.isEmpty())
            return;

        //Add commit to processed set
        vis.add(sha);

        //Get parents of commit, if none, set to empty list
        List<String> parents = parentMap.getOrDefault(sha, new ArrayList<>());

        //Get breadth of commit, if no nodes exist on that level, establish as the first
        int breadth = breadthLog.getOrDefault(depth, 0);

        //Tick the breadth on that level
        breadthLog.put(depth, breadth + 1);

        //Create new commit node
        CommitNode node = new CommitNode(sha, parents, depth, breadth);

        //Add node to tree
        res.add(node);

        //Recursively call on parents
        for(String parentSha : parents) {
            treeHelper(parentSha, parentMap, res, depth + 1, vis, breadthLog);
        }
    }

    public List<CommitNode> getCommitTreeTrace(String owner, String repo) throws IOException {

        //Get all commits for repo
        CommitsListCommit[] commits = gitHubMultiService.getAllCommits(owner, repo);

        //Map to store parent relationships
        Map<String, List<String>> parentMap = new HashMap<>();

        //Starting sha for recursion
        String startSha = null;

        //Populate parent map
        for(CommitsListCommit commit : commits) {

            //If no start sha, set to current commit
            if(startSha == null)
                startSha = commit.getSha();

            //Get parents of commit
            List<Parent> parents = commit.getParents();

            //List to store parent shas
            List<String> parentShas = new ArrayList<>();

            //Add parent shas to list
            for(Parent parent: parents) {
                parentShas.add(parent.getSha());
            }

            //Add parent shas to map
            parentMap.put(commit.getSha(), parentShas);
        }

        //Return tree
        return makeTree(parentMap, startSha);
    }
}
