package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.EventDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EventService {

    Page<EventDto> findAll(Pageable pageable);

    Page<EventDto> findByProject(Project project, Pageable pageable);

    List<EventDto> findByUser(User user);

    EventDto findEventById(Long id);

    EventDto findEventByTitle(String title);

    EventDto saveEvent(EventDto dto);

    EventDto updateEvent(EventDto dto);

    void deleteEvent(Long id);

}
