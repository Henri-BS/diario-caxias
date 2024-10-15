package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.CategoryDto;
import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.entity.UserCategory;
import com.pasifcode.caxias_diary.domain.repository.CategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.UserCategoryRepository;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.UserCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserCategoryServiceImpl implements UserCategoryService {

    @Autowired
    private UserCategoryRepository userCategoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<UserCategoryDto> findByCategory(Category category, Pageable pageable) {
        Page<UserCategory> list = userCategoryRepository.findByCategory(category, pageable);
        return list.map(UserCategoryDto::new);
    }

    @Override
    public UserCategoryDto saveUserCategory(UserCategoryDto dto) {
    User user = userRepository.findById(dto.getUserId()).orElseThrow();
    Category category = categoryRepository.findByName(dto.getCategoryName());

        UserCategory add = new UserCategory();
        add.setUser(user);
        add.setCategory(category);
        return new UserCategoryDto(userCategoryRepository.saveAndFlush(add));
    }

}