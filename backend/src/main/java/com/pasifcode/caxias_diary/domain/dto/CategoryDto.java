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
    private String categoryName;
    private String categoryDescription;
    private Long countEvents;

    public CategoryDto() {
    }

    public CategoryDto(Category entity) {
        id = entity.getId();
        categoryName = entity.getName();
        categoryDescription = entity.getDescription();
        countEvents = entity.getCountEvents();
    }

    public Long getId() {
        return id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public Long getCountEvents() {
        return countEvents;
    }
}

