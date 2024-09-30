package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import com.pasifcode.caxias_diary.domain.entity.Image;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public ResponseEntity<List<ImageDto>> searchImages(
            @RequestParam(defaultValue = "") String title) {
        List<Image> list = imageService.searchImages();
        List<ImageDto> images = list.stream().map(x -> {
            URI url = buildURL(x);
            return new ImageDto(x, url.toString());
        }).toList();
        return ResponseEntity.ok(images);
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Image> possibleImage = imageService.getImage(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Image image = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(image.getExtension().getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData("inline: filename=\"" + image.getFileName() + "\"", image.getFileName());
        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ImageDto> saveImage(
            @RequestParam MultipartFile file,
            @RequestParam String title

    ) throws IOException {
        Image save = imageService.saveImage(file, title);
        URI imageUri = buildURL(save);
        return ResponseEntity.created(imageUri).build();
    }


    @PostMapping("/save-by-project")
    public ResponseEntity<ImageDto> saveByProject(
            @RequestParam MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Project project
    ) throws IOException {
        Image save = imageService.saveByProject(file, title, project);
        URI imageUri = buildURL(save);
        return ResponseEntity.created(imageUri).build();
    }


    private URI buildURL(Image image) {
        String imagePath = "/" + image.getId() +
                "/" + UUID.randomUUID();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build().toUri();
    }

}
