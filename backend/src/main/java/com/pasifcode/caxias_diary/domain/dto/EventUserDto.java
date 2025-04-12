package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pasifcode.caxias_diary.domain.entity.EventUser;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventUserDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long userId;
    private String username;
    private String userImage;
    private Long eventId;
    private String eventTitle;
    private String eventImage;
    private Long projectId;
    private String projectTitle;

    public EventUserDto(EventUser entity) {
        id = entity.getId();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
        userImage = entity.getUser().getImage();
        eventId = entity.getEvent().getId();
        eventTitle = entity.getEvent().getTitle();
        eventImage = entity.getEvent().getImage();
        projectId = entity.getEvent().getProject().getId();
        projectTitle = entity.getEvent().getProject().getTitle();
    }

    public EventUserDto() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    @JsonProperty
    public String getUserImage() {
        return userImage;
    }

    public Long getEventId() {
        return eventId;
    }

    @JsonProperty
    public String getEventTitle() {
        return eventTitle;
    }

    @JsonProperty
    public String getEventImage() {
        return eventImage;
    }

    @JsonProperty
    public Long getProjectId() {
        return projectId;
    }

    @JsonProperty
    public String getProjectTitle() {
        return projectTitle;
    }
}

