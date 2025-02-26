package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ItemDetailsDto;
import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProjectService {
    Page<ProjectDto> findAll(Pageable pageable);

    Page<ProjectDto> findByUser(User user, Pageable pageable);

    ProjectDto findProjectById(Long id);

    ProjectDto saveProject(ProjectDto dto);

    ProjectDto updateProject(ProjectDto dto);

    void deleteProject(Long id);

    ItemDetailsDto saveItem(ItemDetailsDto dto);

    List<ItemDetailsDto> findItems();
}
