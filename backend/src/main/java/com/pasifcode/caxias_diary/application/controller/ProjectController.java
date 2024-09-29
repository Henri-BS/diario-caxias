package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import java.util.UUID;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/list")
    public ResponseEntity<Page<ProjectDto>> findAllProjects(@RequestParam(defaultValue = "") String title, Pageable pageable) {
        Page<ProjectDto> page = projectService.findAllProjects(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/list-by-user/{user}")
    public ResponseEntity<List<ProjectDto>> findAllProjects(@PathVariable User user) {
        List<ProjectDto> list = projectService.findByUser(user);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> findProjectById(@PathVariable Long id) {
        ProjectDto find = projectService.findProjectById(id);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getProjectImage(@PathVariable Long id) {
        Optional<Project> possibleImage = projectService.getProjectImage(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Project projectImage = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(projectImage.getExtension().getMediaType());
        headers.setContentDispositionFormData("inline: filename=\"" + projectImage.getFileName() + "\"", projectImage.getFileName());
        return new ResponseEntity<>(projectImage.getImage(), headers, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ProjectDto> saveProject(@RequestBody ProjectDto dto) {
        ProjectDto add = projectService.saveProject(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto dto) {
        ProjectDto edit = projectService.updateProject(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @PutMapping("/image/{id}")
    public ResponseEntity<ProjectDto> saveProjectImage(
            @RequestParam MultipartFile file,
            @PathVariable Long id) throws IOException {
        Project projectImage = projectService.saveProjectImage(file, id);
        URI imageUri = buildUrl(projectImage);
        return ResponseEntity.created(imageUri).build();

    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id) {
        this.projectService.deleteProject(id);
    }

    private URI buildUrl(Project project) {
        String path = "/" + project.getId() +
                "/" + UUID.randomUUID();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(path)
                .build().toUri();
    }
}