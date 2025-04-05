package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.EventUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EventUserService {

    List<EventUserDto> search(Long userId, Long eventId);

    EventUserDto findById(Long id);

    EventUserDto saveEventUser(EventUserDto dto);

    void deleteEventUser(Long id);

}
