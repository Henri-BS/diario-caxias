package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryDto> findAllCategories(String title, Pageable pageable);

    CategoryDto findCategoryById(Long id);

    CategoryDto saveCategory(CategoryDto dto);

    CategoryDto updateCategory(CategoryDto dto);

    void deleteCategory(Long id);
}