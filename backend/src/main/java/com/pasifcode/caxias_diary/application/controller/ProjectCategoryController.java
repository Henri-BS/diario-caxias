package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.service.ProjectCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project-category")
public class ProjectCategoryController {

    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping
    public ResponseEntity<List<ProjectCategoryDto>> search(
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) String categoryName) {
        List<ProjectCategoryDto> find = projectCategoryService.search(projectId, categoryName);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectCategoryDto> findEventCategoryById(@PathVariable Long id) {
        ProjectCategoryDto find = projectCategoryService.findById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveProjectCategory(@RequestBody ProjectCategoryDto dto) {
        try {
            projectCategoryService.saveProjectCategory(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicateTuplesException e) {
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProjectCategory(@PathVariable Long id) {
        projectCategoryService.deleteProjectCategory(id);
    }
}
