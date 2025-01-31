package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.EventUserDto;
import com.pasifcode.caxias_diary.service.EventUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event-user")
public class EventUserController {

    @Autowired
    private EventUserService eventUserService;

    @GetMapping
    ResponseEntity<Page<EventUserDto>> search(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long eventId,
            Pageable pageable) {
        Page<EventUserDto> find = eventUserService.search(userId, eventId, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    ResponseEntity<EventUserDto> findEventUserById(@PathVariable Long id) {
        EventUserDto find = eventUserService.findById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    ResponseEntity<EventUserDto> saveEventUser(@RequestBody EventUserDto dto) {
        EventUserDto add = eventUserService.saveEventUser(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteEventUser(@PathVariable Long id) {
        this.eventUserService.deleteEventUser(id);
    }
}
