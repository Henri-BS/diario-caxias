package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.repository.ProjectCategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.CategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.ProjectRepository;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.ProjectCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectCategoryServiceImpl implements ProjectCategoryService {

    @Autowired
    private ProjectCategoryRepository projectCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<ProjectCategoryDto> search(Long projectId, String categoryName, Pageable pageable) {
        Specification<ProjectCategory> spec = Specification.where(null);

        if (projectId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("project").get("id"), projectId));
        }

        if (categoryName != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category").get("name"), categoryName));
        }

        return projectCategoryRepository.findAll(spec, pageable).map(ProjectCategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectCategoryDto findById(Long id) {
        ProjectCategory find = projectCategoryRepository.findById(id).orElseThrow();
        return new ProjectCategoryDto(find);
    }

    @Override
    public ProjectCategoryDto saveProjectCategory(ProjectCategoryDto dto) {
        Category category = categoryRepository.findByName(dto.getCategoryName());
        Project project = projectRepository.findById(dto.getProjectId()).orElseThrow();
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        if(category.getName().isEmpty()) {
            Category addCategory = new Category();
            addCategory.setName(dto.getCategoryName());
            categoryRepository.saveAndFlush(category);
        }

        ProjectCategory add = new ProjectCategory();
        add.setCategory(category);
        add.setProject(project);
        add.setUser(user);
        return new ProjectCategoryDto(projectCategoryRepository.saveAndFlush(add));
    }
}
