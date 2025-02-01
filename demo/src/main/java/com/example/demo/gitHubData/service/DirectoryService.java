package com.example.demo.gitHubData.service;

import com.example.demo.gitHubData.model.Directory;
import com.example.demo.gitHubData.model.File;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DirectoryService {

    public Directory map(List<File> files) {
        Directory root = new Directory("!");
        Map<String, Directory> dirMap = new HashMap<>();
        dirMap.put("!", root);

        for (File file : files) {
            String filename = file.getFilename();
            if (filename == null || filename.isBlank()) {
                continue;
            }
            String fullPath = "!/" + filename;
            String[] parts = fullPath.split("/");

            if (parts.length < 2) {
                continue;
            }

            Directory current = root;
            for (int i = 1; i < parts.length - 1; i++) {
                String part = parts[i];
                Directory next = dirMap.computeIfAbsent(part, Directory::new);
                if (!current.getChildren().contains(next)) {
                    current.addChild(next);
                }
                current = next;
            }

            List<File> fileList = current.getFiles();
            if (fileList == null) {
                fileList = new ArrayList<>();
                current.setFiles(fileList);
            }
            fileList.add(file);
        }
        return root;
    }
}