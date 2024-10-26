package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.service.ProjectCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project-category")
public class ProjectCategoryController {

    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/by-project/{project}")
    ResponseEntity<Page<ProjectCategoryDto>> findByEvent(@PathVariable Project project, Pageable pageable) {
        Page<ProjectCategoryDto> find = projectCategoryService.findByProject(project, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/by-category/{category}")
    ResponseEntity<Page<ProjectCategoryDto>> findByCategory(@PathVariable Category category, Pageable pageable) {
        Page<ProjectCategoryDto> find = projectCategoryService.findByCategory(category, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProjectCategoryDto> findEventCategoryById(@PathVariable Long id) {
        ProjectCategoryDto find = projectCategoryService.findById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    ResponseEntity<ProjectCategoryDto> saveEventCategory(@RequestBody ProjectCategoryDto dto) {
        ProjectCategoryDto add = projectCategoryService.saveEventCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }
}
