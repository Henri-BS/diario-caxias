package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.CategoryDto;
import com.pasifcode.caxias_diary.service.interf.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/list")
    ResponseEntity<Page<CategoryDto>> findAllCategories(@RequestParam(defaultValue = "") String name, Pageable pageable) {
        Page<CategoryDto> find = categoryService.findAllCategories(name, pageable);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/{id}")
    ResponseEntity<CategoryDto> findCategoryById(@PathVariable Long id) {
        CategoryDto find = categoryService.findCategoryById(id);
        return ResponseEntity.ok(find);
    }


    @PostMapping("/save")
    ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto dto) {
        CategoryDto add = categoryService.saveCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto dto) {
        CategoryDto edit = categoryService.updateCategory(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteCategory(Long id) {
        this.categoryService.deleteCategory(id);
    }
}
