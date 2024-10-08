package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.PostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.service.PostService;
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

@RestController
@RequestMapping("/posts")
public class ImageController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDto>> searchImages(
            @RequestParam(defaultValue = "") String title) {
        List<Post> list = postService.findAll();
        List<PostDto> posts = list.stream().map(post -> {
            URI url = buildImageURL(post);
            return new PostDto(post, url.toString());
        }).toList();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Post> possibleImage = postService.getImage(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Post post = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(post.getExtension().getMediaType());
        headers.setContentDispositionFormData("inline; filename=\"" + post.getFileName() + "\"", post.getFileName());
        return new ResponseEntity<>(post.getFile(), headers, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<PostDto> saveImage(
            @RequestParam MultipartFile file,
            @RequestParam String title,
            @RequestParam String description

    ) throws IOException {
        Post save = postService.savePost(file, title, description);
        URI imageUri = buildImageURL(save);
        return ResponseEntity.created(imageUri).build();
    }

    private URI buildImageURL(Post post) {
        String imagePath = "/image/" + post.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build().toUri();
    }

}
