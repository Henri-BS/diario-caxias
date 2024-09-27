package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import com.pasifcode.caxias_diary.domain.entity.Image;
import com.pasifcode.caxias_diary.service.ImageService;
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
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public ResponseEntity<Page<ImageDto>> searchImages(
            @RequestParam(defaultValue = "") String title,
            Pageable pageable) {
        Page<ImageDto> list = imageService.searchImages(pageable);
        return ResponseEntity.ok(list);
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

    private URI buildURL(Image image) {
        String imagePath = "/" + image.getId() + image.getTitle();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build().toUri();
    }

}
