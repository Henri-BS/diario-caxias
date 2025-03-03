package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.EventPostDto;
import com.pasifcode.caxias_diary.service.EventPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event-post")
public class EventPostController {

    @Autowired
    private EventPostService eventPostService;

    @GetMapping
    ResponseEntity<List<EventPostDto>> search(
            @RequestParam(required = false) Long eventId,
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) Long postId) {
        List<EventPostDto> find = eventPostService.search(eventId, projectId, postId);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    ResponseEntity<EventPostDto> saveEventPost(@RequestBody EventPostDto dto) {
        EventPostDto add = eventPostService.saveEventPost(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }
}
