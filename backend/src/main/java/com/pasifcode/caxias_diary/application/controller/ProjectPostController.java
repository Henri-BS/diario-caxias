package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.service.ProjectPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project-post")
public class ProjectPostController {

    @Autowired
    private ProjectPostService projectPostService;

    @GetMapping
    ResponseEntity<Page<ProjectPostDto>> search(
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) Long postId,
            Pageable pageable) {
        Page<ProjectPostDto> find = projectPostService.search(projectId, postId, pageable);
        return ResponseEntity.ok(find);
    }
}
