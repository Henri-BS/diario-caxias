package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.dto.EventCategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventCategoryService {

    Page<EventCategoryDto> findByEvent(Event event, Pageable pageable);

    Page<EventCategoryDto> findByCategory(Category category, Pageable pageable);

    EventCategoryDto findById(Long id);

    EventCategoryDto saveEventCategory(EventCategoryDto dto);

    void deleteEventCategory(Long id);

}
