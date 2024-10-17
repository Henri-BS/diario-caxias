package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.enums.Status;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;


public class EventDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String description;
    private String image;
    private LocalDate date;
    private Status status;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
    private String projectTitle;
    private Long userId;
    private String username;

    public EventDto() {
    }

    public EventDto(Event entity) {
        id = entity.getId();
        title = entity.getTitle();
        description = entity.getDescription();
        image = entity.getImage();
        date = entity.getDate();
        status = entity.getStatus();
        createdDate = entity.getCreatedDate();
        projectTitle = entity.getProject().getTitle();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public LocalDate getDate() {
        return date;
    }


    public Status getStatus() {
        return status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }


    public String getProjectTitle() {
        return projectTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }
}