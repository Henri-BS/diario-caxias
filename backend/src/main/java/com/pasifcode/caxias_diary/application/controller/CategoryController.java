package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.CategoryDto;
import com.pasifcode.caxias_diary.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<CategoryDto>> search(@RequestParam(defaultValue = "") String query, Pageable pageable) {
        Page<CategoryDto> list = categoryService.search(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> findCategoryById(@PathVariable Long id) {
        CategoryDto find = categoryService.findCategoryById(id);
        return ResponseEntity.ok(find);
    }

    @GetMapping("/by-name/{name}")
    public ResponseEntity<CategoryDto> findCategoryByName(@PathVariable String name) {
        CategoryDto find = categoryService.findCategoryByName(name);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto dto) {
        CategoryDto add = categoryService.saveCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto dto) {
        CategoryDto edit = categoryService.updateCategory(dto);
        return new ResponseEntity<>(edit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable Long id) {
        this.categoryService.deleteCategory(id);
    }
}
