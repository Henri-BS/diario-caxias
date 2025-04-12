package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectCategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String categoryName;
    private Long projectId;
    private String projectTitle;
    private String projectDescription;
    private String projectImage;
    private Long userId;

    public ProjectCategoryDto() {
    }

    public ProjectCategoryDto(ProjectCategory entity) {
        id = entity.getId();
        categoryName = entity.getCategory().getName();
        projectId = entity.getProject().getId();
        projectTitle = entity.getProject().getTitle();
        projectDescription = entity.getProject().getDescription();
        projectImage = entity.getProject().getImage();
        userId = entity.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public Long getProjectId() {
        return projectId;
    }

    @JsonProperty
    public String getProjectTitle() {
        return projectTitle;
    }

    @JsonProperty
    public String getProjectDescription() {
        return projectDescription;
    }

    @JsonProperty
    public String getProjectImage() {
        return projectImage;
    }

    public Long getUserId() {
        return userId;
    }
}

