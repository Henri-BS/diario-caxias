package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.service.UserCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-category")
public class UserCategoryController {

    @Autowired
    private UserCategoryService userCategoryService;

    @GetMapping
    ResponseEntity<Page<UserCategoryDto>> search(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String categoryName,
            Pageable pageable) {
        Page<UserCategoryDto> find = userCategoryService.search(userId, categoryName, pageable);
        return ResponseEntity.ok(find);
    }
}
