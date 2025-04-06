package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.EventPostDto;
import com.pasifcode.caxias_diary.service.EventPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/event-post")
public class EventPostController {

    @Autowired
    private EventPostService eventPostService;

    @GetMapping
    public ResponseEntity<List<EventPostDto>> search(
            @RequestParam(required = false) Long eventId,
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) Long postId) {
        List<EventPostDto> find = eventPostService.search(eventId, projectId, postId);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveEventPost(@RequestBody EventPostDto dto) {
        try {
            eventPostService.saveEventPost(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicateTuplesException e) {
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEventPost(@PathVariable Long id) {
        this.eventPostService.deleteEventPost(id);
    }
}
