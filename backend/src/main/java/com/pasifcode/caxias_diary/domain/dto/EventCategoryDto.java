package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventCategory;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventCategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String categoryName;
    private Long eventId;
    private String eventTitle;
    private LocalDate eventDate;
    private String eventStatus;
    private String eventImage;
    private String eventProjectTitle;

    public EventCategoryDto() {
    }

    public EventCategoryDto(EventCategory entity) {
        id = entity.getId();
        categoryName = entity.getCategory().getName();
        eventId = entity.getEvent().getId();
        eventTitle = entity.getEvent().getTitle();
        eventDate = entity.getEvent().getEventDate();
        eventStatus = entity.getEvent().getEventStatus().getDescription();
        eventImage = entity.getEvent().getImage();
        eventProjectTitle = entity.getEvent().getProject().getTitle();
    }

    public Long getId() {
        return id;
    }

    public String getCategoryName() {
        return categoryName;
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

