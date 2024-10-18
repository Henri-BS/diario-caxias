package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.Category;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String description;
    private Long countEvents;

    public CategoryDto() {
    }

    public CategoryDto(Category entity) {
        id = entity.getId();
        name = entity.getName();
        description = entity.getDescription();
        countEvents = entity.getCountEvents();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getCountEvents() {
        return countEvents;
    }
}

