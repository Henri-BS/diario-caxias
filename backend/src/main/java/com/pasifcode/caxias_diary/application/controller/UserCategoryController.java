package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.service.UserCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-category")
public class UserCategoryController {

    @Autowired
    private UserCategoryService userCategoryService;

    @GetMapping("/by-category/{category}")
    ResponseEntity<Page<UserCategoryDto>> findUserByCategory(@PathVariable Category category, Pageable pageable) {
        Page<UserCategoryDto> list = userCategoryService.findByCategory(category, pageable);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/save")
    ResponseEntity<UserCategoryDto> saveUserCategory(@RequestBody UserCategoryDto dto) {
        UserCategoryDto add = userCategoryService.saveUserCategory(dto);
        return new ResponseEntity<>(add, HttpStatus.CREATED);
    }
}
