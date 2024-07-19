package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> findAllCategories(String title);

    CategoryDto findCategoryById(Long id);

    CategoryDto saveCategory(CategoryDto dto);

    CategoryDto updateCategory(CategoryDto dto);

    void deleteCategory(Long id);
}
