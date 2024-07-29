package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.dto.EventUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventUserService {

    Page<EventUserDto> findByEvent(Event event, Pageable pageable);

    EventUserDto findById(Long id);

    EventUserDto saveEventUser(EventUserDto dto);

    void deleteEventUser(Long id);
}
