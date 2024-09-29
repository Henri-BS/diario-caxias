package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
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
import java.util.UUID;


@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/list-by-project/{project}")
    ResponseEntity<Page<EventDto>> findAllEvents(
            @PathVariable Project project,
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<EventDto> page = eventService.findByProject(project, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    ResponseEntity<EventDto> findEventById(@PathVariable Long id) {
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
        headers.setContentDispositionFormData("inline: filename=\"" + eventImage.getFileName() + "\"", eventImage.getFileName());
        return new ResponseEntity<>(eventImage.getImage(), headers, HttpStatus.OK);
    }

    @PostMapping("/save")
    ResponseEntity<EventDto> saveEvent(@RequestBody EventDto dto) {
        EventDto add = eventService.saveEvent(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/image/{id}")
    public ResponseEntity<ImageDto> saveImage(
            @RequestParam MultipartFile file,
            @PathVariable Long id
    ) throws IOException {
        Event eventImage = eventService.saveEventImage(file, id);
        URI imageUri = buildURL(eventImage);
        return ResponseEntity.created(imageUri).build();
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

    private URI buildURL(Event event) {
        String path = "/" + event.getId()
                + "/" + UUID.randomUUID();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(path)
                .build().toUri();
    }
}
