package com.pasifcode.caxias_diary.domain.dto;

import com.pasifcode.caxias_diary.domain.entity.ProjectPost;

import java.io.Serial;
import java.io.Serializable;

public class ProjectPostDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String postTitle;
    private String postSummary;
    private String postImage;
    private String projectTitle;
    private String projectImage;
    private String projectDescription;

    public ProjectPostDto() {
    }

    public ProjectPostDto(ProjectPost entity) {
        postTitle = entity.getPost().getTitle();
        postSummary = entity.getPost().getSummary();
        postImage = entity.getPost().getImage();
        projectTitle = entity.getProject().getTitle();
        projectDescription = entity.getProject().getDescription();
        projectImage = entity.getProject().getImage();
    }

    public String getPostTitle() {
        return postTitle;
    }

    public String getPostSummary() {
        return postSummary;
    }

    public String getPostImage() {
        return postImage;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public String getProjectImage() {
        return projectImage;
    }

    public String getProjectDescription() {
        return projectDescription;
    }
}
