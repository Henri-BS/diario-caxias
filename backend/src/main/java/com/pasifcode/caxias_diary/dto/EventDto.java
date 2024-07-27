package com.pasifcode.caxias_diary.dto;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.enums.Season;
import com.pasifcode.caxias_diary.domain.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class EventDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private String image;
    private Season season;
    private Status status;
    private Long projectId;
    private String projectTitle;

    public EventDto(Event entity) {
        id = entity.getId();
        title = entity.getTitle();
        description = entity.getDescription();
        date = entity.getDate();
        image = entity.getImage();
        season = entity.getSeason();
        status = entity.getStatus();
        projectId = entity.getProject().getId();
        projectTitle = entity.getProject().getTitle();
    }
}