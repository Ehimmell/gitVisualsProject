package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.config.GitHubProperties;
import com.example.demo.gitHubData.service.GitHubMultiService;
import com.example.demo.gitHubData.model.FullCommit;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class GitHubSingleService {

    private GitHubProperties GitHubProperties;
}
