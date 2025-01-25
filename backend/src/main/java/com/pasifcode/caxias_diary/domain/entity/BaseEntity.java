package com.pasifcode.caxias_diary.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseEntity {

    @Column(nullable = false, unique = true)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    public BaseEntity() {
    }

    public BaseEntity(String title, String description, String image, LocalDateTime createdDate) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.createdDate = createdDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
}