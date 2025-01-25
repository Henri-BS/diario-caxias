package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pasifcode.caxias_diary.domain.entity.Project;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;


public class ProjectDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String projectTitle;
    private String projectDescription;
    private String projectImage;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
    private Long userId;
    private String username;

    public ProjectDto() {
    }

    public ProjectDto(Project entity) {
        id = entity.getId();
        projectTitle = entity.getTitle();
        projectDescription = entity.getDescription();
        projectImage = entity.getImage();
        createdDate = entity.getCreatedDate();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
    }


    public Long getId() {
        return id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getProjectImage() {
        return projectImage;
    }

}
