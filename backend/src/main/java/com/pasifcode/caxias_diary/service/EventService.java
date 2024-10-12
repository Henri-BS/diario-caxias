package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.EventDto;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


public interface EventService {

    Page<EventDto> findByProject(Project project, Pageable pageable);

    EventDto findEventById(Long id);

    EventDto saveEvent(EventDto dto);

    Event saveEventImage(MultipartFile image, Long id) throws IOException;

    EventDto updateEvent(EventDto dto);

    void deleteEvent(Long id);

    Optional<Event> getImage(Long id);
}
