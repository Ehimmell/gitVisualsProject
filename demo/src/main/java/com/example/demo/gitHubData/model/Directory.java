package com.example.demo.gitHubData.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "currentPath")
public class Directory {
    public String currentPath;
    Set<Directory> children = new HashSet<>();
    List<File> files = new ArrayList<>();

    public Directory(String currentPath) {
        this.currentPath = currentPath;
    }

    public void addChild(Directory child) {
        children.add(child);
    }
}