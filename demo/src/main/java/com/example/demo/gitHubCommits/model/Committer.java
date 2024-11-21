package com.example.demo.gitHubCommits.model;

class Committer {

    /* *** Properties *** */

    // The username of the committer
    private String username;

    // The email of the committer
    private String email;

    /* *** Getters and Setters *** */

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}