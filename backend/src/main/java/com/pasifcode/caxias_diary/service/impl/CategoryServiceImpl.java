package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.CategoryDto;
import com.pasifcode.caxias_diary.entity.Category;
import com.pasifcode.caxias_diary.repository.CategoryRepository;
import com.pasifcode.caxias_diary.repository.UserRepository;
import com.pasifcode.caxias_diary.service.interf.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<CategoryDto> findAllCategories(String name, Pageable pageable) {
        Page<Category> find = categoryRepository.findAllPostCategories(name, pageable);
        return find.map(CategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto findCategoryById(Long id) {
        Category find = categoryRepository.findById(id).orElseThrow();
        return new CategoryDto(find);
    }

    @Override
    public CategoryDto saveCategory(CategoryDto dto) {

        Category add = new Category();
        add.setName(dto.getName());
        add.setDescription(dto.getDescription());
        add.setImage(dto.getImage());
        return new CategoryDto(categoryRepository.saveAndFlush(add));
    }

    @Override
    public CategoryDto updateCategory(CategoryDto dto) {
        Category edit = categoryRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setName(dto.getName());
        edit.setDescription(dto.getDescription());
        edit.setImage(dto.getImage());
        return new CategoryDto(categoryRepository.save(edit));
    }

    @Override
    public void deleteCategory(Long id) {
        this.categoryRepository.deleteById(id);
    }
}