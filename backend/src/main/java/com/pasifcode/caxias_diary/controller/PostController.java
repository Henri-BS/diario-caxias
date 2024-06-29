package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.PostDto;
import com.pasifcode.caxias_diary.service.interf.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/list")
    ResponseEntity<Page<PostDto>> findAllPosts(@RequestParam(defaultValue = "") String title, Pageable pageable) {
        Page<PostDto> find = postService.findAllPosts(title, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    ResponseEntity<PostDto> findPostById(@PathVariable Long id) {
        PostDto find = postService.findPostById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    ResponseEntity<PostDto> savePost(@RequestBody PostDto dto) {
        PostDto add = postService.savePost(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<PostDto> updatePost(@RequestBody PostDto dto) {
        PostDto edit = postService.updatePost(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deletePost(Long id) {
        this.postService.deletePost(id);
    }
}
