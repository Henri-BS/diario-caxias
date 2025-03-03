package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectCategoryService {

    Page<ProjectCategoryDto> search(Long projectId, String categoryName, Pageable pageable);

    ProjectCategoryDto findById(Long id);

    ProjectCategoryDto saveProjectCategory(ProjectCategoryDto dto);
}
