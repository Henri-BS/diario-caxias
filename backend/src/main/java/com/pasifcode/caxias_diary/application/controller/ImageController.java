package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import com.pasifcode.caxias_diary.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
        ImageDto save = imageService.saveImage(file, title);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }




}
