package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.EventDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface EventService {

    Page<EventDto> findByProject(Project project, Pageable pageable);

    EventDto findEventById(Long id);

    EventDto saveEvent(EventDto dto);

    EventDto updateEvent(EventDto dto);

    void deleteEvent(Long id);
}