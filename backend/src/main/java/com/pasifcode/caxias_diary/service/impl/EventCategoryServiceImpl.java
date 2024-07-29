package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.EventCategory;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.dto.EventCategoryDto;
import com.pasifcode.caxias_diary.repository.EventRepository;
import com.pasifcode.caxias_diary.repository.EventCategoryRepository;
import com.pasifcode.caxias_diary.repository.CategoryRepository;
import com.pasifcode.caxias_diary.service.interf.EventCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EventCategoryServiceImpl implements EventCategoryService {

    @Autowired
    private EventCategoryRepository eventCategoryRepository;

    @Autowired
    private CategoryRepository CategoryRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<EventCategoryDto> findByEvent(Event event, Pageable pageable) {
        Page<EventCategory> find = eventCategoryRepository.findByEvent(event, pageable);
        return find.map(EventCategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public EventCategoryDto findById(Long id) {
        EventCategory find = eventCategoryRepository.findById(id).orElseThrow();
        return new EventCategoryDto(find);
    }

    @Override
    public EventCategoryDto saveEventCategory(EventCategoryDto dto) {
        Category Category = CategoryRepository.findById(dto.getCategoryId()).orElseThrow();
        Event event = eventRepository.findById(dto.getEventId()).orElseThrow();

        EventCategory add = new EventCategory();
                add.setCategory(Category);
                add.setEvent(event);
        return new EventCategoryDto(eventCategoryRepository.saveAndFlush(add));
    }

    @Override
    public void deleteEventCategory(Long id) {
        this.eventCategoryRepository.deleteById(id);
    }
}
