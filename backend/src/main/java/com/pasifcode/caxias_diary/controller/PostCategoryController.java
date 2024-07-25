package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.PostCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.service.interf.PostCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post-category")
public class PostCategoryController {

    @Autowired
    private PostCategoryService postCategoryService;

    @GetMapping("/list")
    ResponseEntity<Page<PostCategoryDto>> findByPost(Project project, Pageable pageable) {
        Page<PostCategoryDto> find = postCategoryService.findByPost(project, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    ResponseEntity<PostCategoryDto> findPostCategoryById(@PathVariable Long id) {
        PostCategoryDto find = postCategoryService.findPostCategoryById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    ResponseEntity<PostCategoryDto> savePostCategory(@RequestBody PostCategoryDto dto) {
        PostCategoryDto add = postCategoryService.savePostCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deletePostCategory(Long id) {
        this.postCategoryService.deletePostCategory(id);
    }
}
