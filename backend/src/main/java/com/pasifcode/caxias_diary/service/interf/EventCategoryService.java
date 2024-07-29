package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.dto.EventCategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface EventCategoryService {
    Page<EventCategoryDto> findByEvent(Event event, Pageable pageable);

    EventCategoryDto findById(Long id);

    EventCategoryDto saveEventCategory(EventCategoryDto dto);

    void deleteEventCategory(Long id);
}
