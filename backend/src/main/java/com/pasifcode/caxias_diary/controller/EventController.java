package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.dto.EventDto;
import com.pasifcode.caxias_diary.service.interf.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/list-by-project/{project}")
    ResponseEntity<Page<EventDto>> findAllEvents(@PathVariable Project project, Pageable pageable) {
        Page<EventDto> page = eventService.findByProject(project, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    ResponseEntity<EventDto> findEventById(@PathVariable Long id) {
        EventDto find = eventService.findEventById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    ResponseEntity<EventDto> saveEvent(@RequestBody EventDto dto) {
        EventDto add = eventService.saveEvent(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<EventDto> updateEvent(@RequestBody EventDto dto) {
        EventDto edit = eventService.updateEvent(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteEvent(@PathVariable Long id) {
        this.eventService.deleteEvent(id);
    }
}