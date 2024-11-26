package com.example.demo.gitHubCommits.model;

public class Parent {

    private String sha;

    private String url;

    private String html_url;

    public void setSha(String sha) {
        this.sha = sha;
    }

    public String getSha() {
        return sha;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    public String getHtml_url() {
        return html_url;
    }
}
