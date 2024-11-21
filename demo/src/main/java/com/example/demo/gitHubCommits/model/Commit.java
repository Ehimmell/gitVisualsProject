package com.example.demo.gitHubCommits.model;

public class Commit {

    /* *** Properties *** */

    // The SHA of the commit
    private String sha;

    /* The commit details. Includes: the "committer"(another class) who authored the commit, the date, and
    the message */
    private CommitDetail commitDetail;

    /* *** Getters and Setters *** */

    public String getSha() {
        return sha;
    }

    public void setSha(String sha) {
        this.sha = sha;
    }

    public CommitDetail getCommitDetail() {
        return commitDetail;
    }

    public void setCommitDetail(CommitDetail commitDetail) {
        this.commitDetail = commitDetail;
    }
}