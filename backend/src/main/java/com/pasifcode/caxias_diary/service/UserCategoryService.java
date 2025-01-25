package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserCategoryService {
    Page<UserCategoryDto> findByCategory(Category category, Pageable pageable);

    Page<UserCategoryDto> findByUser(User user, Pageable pageable);
}
