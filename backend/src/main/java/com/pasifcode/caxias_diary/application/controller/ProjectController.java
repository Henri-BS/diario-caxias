package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<Page<ProjectDto>> findProjects(@RequestParam(defaultValue = "") String title, Pageable pageable) {
        Page<ProjectDto> page = projectService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/by-user/{user}")
    public ResponseEntity<Page<ProjectDto>> findByUser(@PathVariable User user, Pageable pageable) {
        Page<ProjectDto> list = projectService.findByUser(user, pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> findProjectById(@PathVariable Long id) {
        ProjectDto find = projectService.findProjectById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    public ResponseEntity<ProjectDto> saveProject(
            @RequestBody ProjectDto dto) {
        ProjectDto add = projectService.saveProject(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto dto) {
        ProjectDto edit = projectService.updateProject(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id) {
        this.projectService.deleteProject(id);
    }

}