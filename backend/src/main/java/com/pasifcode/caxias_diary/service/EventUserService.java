package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.dto.EventUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventUserService {

    Page<EventUserDto> findByEvent(Event event, Pageable pageable);

    EventUserDto findById(Long id);

    EventUserDto saveEventUser(EventUserDto dto);

    void deleteEventUser(Long id);
}
