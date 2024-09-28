package com.pasifcode.caxias_diary.domain.dto;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.enums.Season;
import com.pasifcode.caxias_diary.domain.enums.Status;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;


public class EventDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private Season season;
    private Status status;
    private Long projectId;
    private String projectTitle;

    public EventDto() {
    }

    public EventDto(Event entity) {
        id = entity.getId();
        title = entity.getTitle();
        description = entity.getDescription();
        date = entity.getDate();
        season = entity.getSeason();
        status = entity.getStatus();
        projectId = entity.getProject().getId();
        projectTitle = entity.getProject().getTitle();
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

    public LocalDate getDate() {
        return date;
    }

    public Season getSeason() {
        return season;
    }

    public Status getStatus() {
        return status;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }
}