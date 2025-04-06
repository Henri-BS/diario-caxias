package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.EventUserDto;

import java.util.List;

public interface EventUserService {

    List<EventUserDto> search(Long userId, Long eventId);

    EventUserDto findById(Long id);

    void saveEventUser(EventUserDto dto);

    void deleteEventUser(Long id);

}
