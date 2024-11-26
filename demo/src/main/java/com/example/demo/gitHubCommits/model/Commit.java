package com.example.demo.gitHubCommits.model;

import java.util.List;

public class Commit {

    private String sha;

    private String node_id;

    private String html_url;

    private Author author;

    private Author commiter;

    private Tree tree;

    private String message;

    private List<Parent> parents;

    private Verification verification;

    public void setSha(String sha) {
        this.sha = sha;
    }

    public String getSha() {
        return sha;
    }

    public void setNode_id(String node_id) {
        this.node_id = node_id;
    }

    public String getNode_id() {
        return node_id;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    public String getHtml_url() {
        return html_url;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Author getAuthor() {
        return author;
    }

    public void setCommiter(Author commiter) {
        this.commiter = commiter;
    }

    public Author getCommiter() {
        return commiter;
    }

    public void setTree(Tree tree) {
        this.tree = tree;
    }

    public Tree getTree() {
        return tree;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setParents(List<Parent> parents) {
        this.parents = parents;
    }

    public List<Parent> getParents() {
        return parents;
    }

    public void setVerification(Verification verification) {
        this.verification = verification;
    }

    public Verification getVerification() {
        return verification;
    }
}