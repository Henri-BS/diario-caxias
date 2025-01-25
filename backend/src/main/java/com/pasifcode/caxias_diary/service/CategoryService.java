package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryDto> findAllCategories(Pageable pageable);

    CategoryDto findCategoryById(Long id);

    CategoryDto saveCategory(CategoryDto dto);

    CategoryDto updateCategory(CategoryDto dto);

    void deleteCategory(Long id);
}
