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
    private String eventTitle;
    private String eventDescription;
    private String eventImage;
    private LocalDate eventDate;
    private Status eventStatus;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
    private Long projectId;
    private String projectTitle;
    private Long userId;
    private String username;

    public EventDto() {
    }

    public EventDto(Event entity) {
        id = entity.getId();
        eventTitle = entity.getTitle();
        eventDescription = entity.getDescription();
        eventImage = entity.getImage();
        eventDate = entity.getEventDate();
        eventStatus = entity.getEventStatus();
        createdDate = entity.getCreatedDate();
        projectId = entity.getProject().getId();
        projectTitle = entity.getProject().getTitle();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
    }

    public Long getId() {
        return id;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public String getEventImage() {
        return eventImage;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public Status getEventStatus() {
        return eventStatus;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public Long getProjectId() {
        return projectId;
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