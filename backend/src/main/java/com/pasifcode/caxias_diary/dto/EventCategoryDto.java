package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventCategory;
import com.pasifcode.caxias_diary.domain.entity.EventUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventCategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long eventId;
    private String eventTitile;

    public EventCategoryDto(EventCategory entity) {
        id = entity.getId();
        categoryId = entity.getCategory().getId();
        categoryName = entity.getCategory().getName();
        eventId = entity.getEvent().getId();
        eventTitile = entity.getEvent().getTitle();
    }
}

