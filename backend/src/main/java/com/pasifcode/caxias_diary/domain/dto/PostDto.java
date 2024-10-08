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
    private String title;
    private String description;
    private String extension;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime uploadDate;
    private String imageUrl;

    public PostDto() {
    }

    public PostDto(Post entity, String imageUrl) {
        this.imageUrl = imageUrl;
        id = entity.getId();
        title = entity.getTitle();
        description = entity.getDescription();
        extension = entity.getExtension().name();
        uploadDate = entity.getUploadDate();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getExtension() {
        return extension;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }


    public String getImageUrl() {
        return imageUrl;
    }
}
