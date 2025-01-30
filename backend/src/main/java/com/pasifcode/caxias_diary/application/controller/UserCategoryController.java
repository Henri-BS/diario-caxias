package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.User;
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

    @GetMapping("/by-category/{category}")
    ResponseEntity<Page<UserCategoryDto>> findByCategory(@PathVariable Category category, Pageable pageable) {
        Page<UserCategoryDto> list = userCategoryService.findByCategory(category, pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/by-user/{user}")
    ResponseEntity<Page<UserCategoryDto>> findByUser(@PathVariable User user, Pageable pageable) {
        Page<UserCategoryDto> list = userCategoryService.findByUser(user, pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    ResponseEntity<Page<UserCategoryDto>> search(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String categoryName,
            Pageable pageable) {
        Page<UserCategoryDto> find = userCategoryService.search(username, categoryName, pageable);
        return ResponseEntity.ok(find);
    }
}
