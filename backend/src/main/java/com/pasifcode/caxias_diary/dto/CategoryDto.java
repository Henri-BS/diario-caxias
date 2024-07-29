package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String description;

    public CategoryDto(Category entity) {
        id = entity.getId();
        name = entity.getName();
        description = entity.getDescription();
    }
}

