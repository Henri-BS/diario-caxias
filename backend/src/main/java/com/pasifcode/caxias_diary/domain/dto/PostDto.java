package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.Post;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String postTitle;
    private String postDescription;
    private String postSummary;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
    private String postImage;
    private Long userId;

    public PostDto() {
    }

    public PostDto(Post entity) {
        id = entity.getId();
        postTitle = entity.getTitle();
        postImage = entity.getImage();
        postDescription = entity.getDescription();
        postSummary = entity.getSummary();
        createdDate = entity.getCreatedDate();

        userId = entity.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public String getPostSummary() {
        return postSummary;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public String getPostImage() {
        return postImage;
    }

    public Long getUserId() {
        return userId;
    }
}
