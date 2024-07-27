package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.dto.EventUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface EventUserService {

    @Transactional(readOnly = true)
    Page<EventUserDto> findByEvent(Event event, Pageable pageable);

    @Transactional(readOnly = true)
    EventUserDto findById(Long id);

    EventUserDto saveEventUser(EventUserDto dto);

    void deleteEventUser(Long id);
}
