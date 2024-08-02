package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.service.interf.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/list")
    ResponseEntity<Page<ProjectDto>> findAllProjects(@RequestParam(defaultValue = "") String title, Pageable pageable) {
        Page<ProjectDto> page = projectService.findAllProjects(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/list-by-user/{user}")
    ResponseEntity<List<ProjectDto>> findAllProjects(@PathVariable User user) {
        List<ProjectDto> list = projectService.findByUser(user);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProjectDto> findProjectById(@PathVariable Long id) {
        ProjectDto find = projectService.findProjectById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    ResponseEntity<ProjectDto> saveProject(@RequestBody ProjectDto dto) {
        ProjectDto add = projectService.saveProject(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto dto) {
        ProjectDto edit = projectService.updateProject(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteProject(@PathVariable Long id) {
        this.projectService.deleteProject(id);
    }
}
