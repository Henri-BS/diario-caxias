package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.PostCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostCategoryDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long postId;
    private String postTitle;
    private Long categoryId;
    private String categoryName;

    public PostCategoryDto(PostCategory entity) {
        id = entity.getId();
        postId = entity.getProject().getId();
        postTitle = entity.getProject().getTitle();
        categoryId = entity.getCategory().getId();
        categoryName = entity.getCategory().getName();
    }
}

