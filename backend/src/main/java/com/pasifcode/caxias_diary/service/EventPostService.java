package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.EventPostDto;

import java.util.List;

public interface EventPostService {
    List<EventPostDto> search(Long eventId, Long projectId, Long postId);

    void saveEventPost(EventPostDto dto);

    void deleteEventPost(Long id);
}
