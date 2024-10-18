package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.dto.EventCategoryDto;
import com.pasifcode.caxias_diary.service.EventCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event-category")
public class EventCategoryController {

    @Autowired
    private EventCategoryService eventCategoryService;

    @GetMapping("/by-event/{event}")
    ResponseEntity<Page<EventCategoryDto>> findByEvent(@PathVariable Event event, Pageable pageable) {
        Page<EventCategoryDto> find = eventCategoryService.findByEvent(event, pageable);
        return ResponseEntity.ok(find);
    }
        @GetMapping("/by-category/{category}")
        ResponseEntity<Page<EventCategoryDto>> findByCategory(@PathVariable Category category, Pageable pageable) {
            Page<EventCategoryDto> find = eventCategoryService.findByCategory(category, pageable);
            return ResponseEntity.ok(find);
        }

    @GetMapping("/{id}")
    ResponseEntity<EventCategoryDto> findEventCategoryById(@PathVariable Long id) {
        EventCategoryDto find = eventCategoryService.findById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    ResponseEntity<EventCategoryDto> saveEventCategory(@RequestBody EventCategoryDto dto) {
        EventCategoryDto add = eventCategoryService.saveEventCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteEventCategory(@PathVariable Long id) {
        this.eventCategoryService.deleteEventCategory(id);
    }
}
