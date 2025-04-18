package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.EventUserDto;
import com.pasifcode.caxias_diary.service.EventUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/event-user")
public class EventUserController {

    @Autowired
    private EventUserService eventUserService;

    public @GetMapping
    ResponseEntity<List<EventUserDto>> search(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long eventId) {
        List<EventUserDto> find = eventUserService.search(userId, eventId);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventUserDto> findEventUserById(@PathVariable Long id) {
        EventUserDto find = eventUserService.findById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveEventUser(@RequestBody EventUserDto dto) {
        try {
            eventUserService.saveEventUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (DuplicateTuplesException e){
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEventUser(@PathVariable Long id) {
        this.eventUserService.deleteEventUser(id);
    }
}
