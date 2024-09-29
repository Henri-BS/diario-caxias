package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.Project;

import java.io.Serial;
import java.io.Serializable;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String body;
    private Integer countEvents;
    private Long countCategories;
    private Integer countUsers;
    private Long userId;
    private String username;

    public ProjectDto() {
    }

    public ProjectDto(Project entity) {
        id = entity.getId();
        title = entity.getTitle();
        body = entity.getBody();
        countEvents = entity.getCountEvents();
        countCategories = entity.getCountCategories();
        countUsers = entity.getCountUsers();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }


    public Integer getCountEvents() {
        return countEvents;
    }

    public Long getCountCategories() {
        return countCategories;
    }

    public Integer getCountUsers() {
        return countUsers;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }
}
