package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.Project;
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

    @GetMapping("/by-post/{post}")
    ResponseEntity<Page<ProjectPostDto>> findByPost( @PathVariable Post post, Pageable pageable) {
        Page<ProjectPostDto> find = projectPostService.findByPost(post, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/by-project/{project}")
    ResponseEntity<Page<ProjectPostDto>> findByProject( @PathVariable Project project, Pageable pageable) {
        Page<ProjectPostDto> find = projectPostService.findByProject(project, pageable);
        return ResponseEntity.ok(find);
    }
}
