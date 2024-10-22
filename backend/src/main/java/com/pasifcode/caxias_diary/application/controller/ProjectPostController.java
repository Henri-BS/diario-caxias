package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.service.ProjectPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project-post")
public class ProjectPostController {

    @Autowired
    private ProjectPostService projectPostService;

    @GetMapping
    ResponseEntity<Page<ProjectPostDto>> search(
            @RequestParam(required = false) Post post,
            @RequestParam(required = false) Project project,
            Pageable pageable) {
        Page<ProjectPostDto> find = projectPostService.search(post, project, pageable);
        return ResponseEntity.ok(find);
    }

}
