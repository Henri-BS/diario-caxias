package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;

import java.util.List;

public interface ProjectCategoryService {

    List<ProjectCategoryDto> search(Long projectId, String categoryName);

    ProjectCategoryDto findById(Long id);

    ProjectCategoryDto saveProjectCategory(ProjectCategoryDto dto);

    void deleteProjectCategory(Long id);
}
