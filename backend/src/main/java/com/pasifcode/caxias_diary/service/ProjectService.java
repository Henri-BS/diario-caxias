package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


public interface ProjectService {
    Page<ProjectDto> findAllProjects(Pageable pageable);

    List<ProjectDto> findByUser(User user);

    ProjectDto findProjectById(Long id);

    ProjectDto saveProject(ProjectDto dto);

    ProjectDto updateProject(ProjectDto dto);

    void deleteProject(Long id);

}
