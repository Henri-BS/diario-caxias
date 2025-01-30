package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.CategoryDto;
import com.pasifcode.caxias_diary.domain.dto.ProjectCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import com.pasifcode.caxias_diary.domain.repository.CategoryRepository;
import com.pasifcode.caxias_diary.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryDto> search(Pageable pageable) {
        Page<Category> list = categoryRepository.findAll(pageable);
        return list.map(CategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto findCategoryById(Long id) {
        Category find = categoryRepository.findById(id).orElseThrow();
        return new CategoryDto(find);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto findCategoryByName(String name) {
        Category find = categoryRepository.findByName(name);
        return new CategoryDto(find);
    }

    @Override
    public CategoryDto saveCategory(CategoryDto dto) {

        Category add = new Category();
        add.setName(dto.getCategoryName());
        add.setDescription(dto.getCategoryDescription());
        return new CategoryDto(categoryRepository.saveAndFlush(add));
    }

    @Override
    public CategoryDto updateCategory(CategoryDto dto) {
        Category edit = categoryRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setName(dto.getCategoryName());
        edit.setDescription(dto.getCategoryDescription());
        return new CategoryDto(categoryRepository.save(edit));
    }

    @Override
    public void deleteCategory(Long id) {
        this.categoryRepository.deleteById(id);
    }
}