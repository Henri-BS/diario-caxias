package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pasifcode.caxias_diary.domain.entity.Image;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

public class ImageDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private Long size;
    private String extension;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime uploadDate;

    public ImageDto() {
    }

    public ImageDto(Image entity) {
        id = entity.getId();
        title = entity.getTitle();
        size = entity.getSize();
        extension = entity.getExtension().name();
        uploadDate = entity.getUploadDate();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getSize() {
        return size;
    }

    public String getExtension() {
        return extension;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
}
