package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventCategory;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventCategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long eventId;
    private String eventTitile;

    public EventCategoryDto() {
    }

    public EventCategoryDto(EventCategory entity) {
        id = entity.getId();
        categoryId = entity.getCategory().getId();
        categoryName = entity.getCategory().getName();
        eventId = entity.getEvent().getId();
        eventTitile = entity.getEvent().getTitle();
    }

    public Long getId() {
        return id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventTitile() {
        return eventTitile;
    }
}

