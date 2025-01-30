package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectCategoryService {


    Page<ProjectCategoryDto> search(String projectTitle, String categoryName, Pageable pageable);

    ProjectCategoryDto findById(Long id);

    ProjectCategoryDto saveEventCategory(ProjectCategoryDto dto);

}
