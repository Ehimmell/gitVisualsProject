package com.example.demo.gitHubCommits.model;

public class CommitDetail {

    /* *** Properties *** */

    // The commit message
    private String message;

    //The person who made the commit. Includes: the username and email
    private Committer committer;

    //The date of the commit
    private String date;

    /* *** Getters and Setters *** */

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Committer getCommitter() {
        return committer;
    }

    public void setCommitter(Committer committer) {
        this.committer = committer;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}