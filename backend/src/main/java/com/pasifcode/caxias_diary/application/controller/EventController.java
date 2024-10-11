package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.PostDto;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.dto.EventDto;
import com.pasifcode.caxias_diary.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<Page<EventDto>> FindEvents(
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<Event> page = eventService.findAll(pageable);
        Page<EventDto> events = page.map(event -> {
            URI url = buildURL(event);
            return new EventDto(event, url.toString());
        });
        return ResponseEntity.ok(events);
    }

    @GetMapping("/by-project/{project}")
    public ResponseEntity<Page<EventDto>> findByProject(
            @PathVariable Project project,
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<Event> page = eventService.findAll(pageable);
        Page<EventDto> events = page.map(event -> {
            URI url = buildURL(event);
            return new EventDto(event, url.toString());
        });
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> findEventById(@PathVariable Long id) {
        EventDto find = eventService.findEventById(id);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Event> possibleImage = eventService.getImage(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Event eventImage = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(eventImage.getExtension().getMediaType());
        headers.setContentDispositionFormData("inline; filename=\"" + eventImage.getFileName() + "\"", eventImage.getFileName());
        return new ResponseEntity<>(eventImage.getImage(), headers, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<EventDto> saveEvent(@RequestBody EventDto dto) {
        EventDto add = eventService.saveEvent(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/image/{id}")
    public ResponseEntity<PostDto> saveImage(
            @RequestParam MultipartFile file,
            @PathVariable Long id
    ) throws IOException {
        Event eventImage = eventService.saveEventImage(file, id);
        URI imageUri = buildURL(eventImage);
        return ResponseEntity.created(imageUri).build();
    }


    @PutMapping("/update")
    public ResponseEntity<EventDto> updateEvent(@RequestBody EventDto dto) {
        EventDto edit = eventService.updateEvent(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id) {
        this.eventService.deleteEvent(id);
    }

    private URI buildURL(Event event) {
        String path = "/image/" + event.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(path)
                .build().toUri();
    }
}
