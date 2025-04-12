package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pasifcode.caxias_diary.domain.entity.EventPost;

import java.io.Serial;
import java.io.Serializable;

public class EventPostDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long   id;
    private Long   postId;
    private String postTitle;
    private String postImage;
    private Long   eventId;
    private String eventTitle;
    private String eventImage;
    private Long   projectId;
    private String projectTitle;
    private Long   userId;


    public EventPostDto() {
    }

    public EventPostDto(EventPost entity) {
        id = entity.getId();
        postId = entity.getPost().getId();
        postTitle = entity.getPost().getTitle();
        postImage = entity.getPost().getImage();
        eventId = entity.getEvent().getId();
        eventTitle = entity.getEvent().getTitle();
        eventImage = entity.getEvent().getImage();
        projectId = entity.getEvent().getProject().getId();
        projectTitle = entity.getEvent().getProject().getTitle();
        userId = entity.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public Long getPostId() {
        return postId;
    }

    @JsonProperty
    public String getPostTitle() {
        return postTitle;
    }

    @JsonProperty
    public String getPostImage() {
        return postImage;
    }

    @JsonProperty
    public Long getEventId() {
        return eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    @JsonProperty
    public String getEventImage() {
        return eventImage;
    }

    @JsonProperty
    public Long getProjectId() {
        return projectId;
    }

    @JsonProperty
    public String getProjectTitle() {
        return projectTitle;
    }

    public Long getUserId() {
        return userId;
    }
}
