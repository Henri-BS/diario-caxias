package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventUser;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

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
    private LocalDate eventDate;
    private String eventStatus;
    private String eventImage;
    private String eventProjectTitle;

    public EventUserDto(EventUser entity) {
        id = entity.getId();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
        userImage = entity.getUser().getImage();
        eventId = entity.getEvent().getId();
        eventTitle = entity.getEvent().getTitle();
        eventDate = entity.getEvent().getEventDate();
        eventStatus = entity.getEvent().getEventStatus().getDescription();
        eventImage = entity.getEvent().getImage();
        eventProjectTitle = entity.getEvent().getProject().getTitle();
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

    public String getUserImage() {
        return userImage;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public String getEventImage() {
        return eventImage;
    }

    public String getEventProjectTitle() {
        return eventProjectTitle;
    }
}

