package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.EventUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventUserDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private Long userId;
    private String userName;
    private String userImage;
    private Long eventId;
    private String eventTitile;

    public EventUserDto(EventUser entity) {
        id = entity.getId();
        userId = entity.getUser().getId();
        userName = entity.getUser().getFirstName() + " " + entity.getUser().getLastName();
        userImage = entity.getUser().getImage();
        eventId = entity.getEvent().getId();
        eventTitile = entity.getEvent().getTitle();
    }
}

