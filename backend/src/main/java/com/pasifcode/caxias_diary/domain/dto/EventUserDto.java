package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventUser;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventUserDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long userId;
    private String userName;
    private Long eventId;
    private String eventTitile;

    public EventUserDto(EventUser entity) {
        id = entity.getId();
        userId = entity.getUser().getId();
        userName = entity.getUser().getUsername();
        eventId = entity.getEvent().getId();
        eventTitile = entity.getEvent().getTitle();
    }

    public EventUserDto() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }


    public Long getEventId() {
        return eventId;
    }

    public String getEventTitile() {
        return eventTitile;
    }
}

