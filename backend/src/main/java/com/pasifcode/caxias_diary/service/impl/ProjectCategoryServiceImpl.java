package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.domain.repository.ProejectCategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.CategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.ProjectRepository;
import com.pasifcode.caxias_diary.service.ProjectCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectCategoryServiceImpl implements ProjectCategoryService {

    @Autowired
    private ProejectCategoryRepository proejectCategoryRepository;

    @Autowired
    private CategoryRepository CategoryRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectCategoryDto> findByProject(Project project, Pageable pageable) {
        Page<ProjectCategory> find = proejectCategoryRepository.findByProject(project, pageable);
        return find.map(ProjectCategoryDto::new);
    }

    @Override
    public Page<ProjectCategoryDto> findByCategory(Category category, Pageable pageable) {
        Page<ProjectCategory> find = proejectCategoryRepository.findByCategory(category, pageable);
        return find.map(ProjectCategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectCategoryDto findById(Long id) {
        ProjectCategory find = proejectCategoryRepository.findById(id).orElseThrow();
        return new ProjectCategoryDto(find);
    }

    @Override
    public ProjectCategoryDto saveEventCategory(ProjectCategoryDto dto) {
        Category Category = CategoryRepository.findByName(dto.getCategoryName());
        Project event = projectRepository.findById(dto.getProjectId()).orElseThrow();

        ProjectCategory add = new ProjectCategory();
        add.setCategory(Category);
        add.setProject(event);
        return new ProjectCategoryDto(proejectCategoryRepository.saveAndFlush(add));
    }
}
