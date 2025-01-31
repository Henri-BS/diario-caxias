package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.dto.EventDto;
import com.pasifcode.caxias_diary.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    ResponseEntity<Page<EventDto>> findEvents(
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<EventDto> list = eventService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/by-project/{project}")
    ResponseEntity<Page<EventDto>> findByProject(
            @PathVariable Project project,
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<EventDto> list = eventService.findByProject(project, pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    ResponseEntity<EventDto> findEventById(@PathVariable Long id) {
        EventDto find = eventService.findEventById(id);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/by-title/{title}")
    ResponseEntity<EventDto> findEventByTitle(@PathVariable String title) {
        EventDto find = eventService.findEventByTitle(title);
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
