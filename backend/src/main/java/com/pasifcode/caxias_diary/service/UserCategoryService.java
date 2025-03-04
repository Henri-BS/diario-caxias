package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserCategoryService {
    Page<UserCategoryDto> search(Long userId, String categoryName, Pageable pageable);
}
