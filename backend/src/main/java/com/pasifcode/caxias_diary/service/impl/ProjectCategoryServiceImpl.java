package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

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
    public List<ProjectCategoryDto> search(Long projectId, String categoryName) {
        Specification<ProjectCategory> spec = Specification.where(null);

        if (projectId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("project").get("id"), projectId));
        }

        if (categoryName != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category").get("name"), categoryName));
        }

        return projectCategoryRepository.findAll(spec).stream().map(ProjectCategoryDto::new).toList();
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

        if (category.getName().isEmpty()) {
            Category addCategory = new Category();
            addCategory.setName(dto.getCategoryName());
            categoryRepository.saveAndFlush(category);
        }

        ProjectCategory add = new ProjectCategory();
        add.setCategory(category);
        add.setProject(project);
        add.setUser(user);
        for (ProjectCategory p : projectCategoryRepository.findAll()) {
            if (Objects.equals(project.getId(), p.getProject().getId()) &&
                    Objects.equals(category.getId(), p.getCategory().getId())) {
                throw new DuplicateTuplesException("Esta relacão já existe!");
            } else {
                projectCategoryRepository.saveAndFlush(add);
            }
        }

        return new ProjectCategoryDto(add);
    }

    @Override
    public void deleteProjectCategory(Long id) {
        this.projectCategoryRepository.deleteById(id);
    }
}
