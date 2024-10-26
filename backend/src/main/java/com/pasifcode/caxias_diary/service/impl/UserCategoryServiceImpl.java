package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.UserCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.entity.UserCategory;
import com.pasifcode.caxias_diary.domain.repository.UserCategoryRepository;
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

    @Override
    @Transactional(readOnly = true)
    public Page<UserCategoryDto> findByCategory(Category category, Pageable pageable) {
        Page<UserCategory> list = userCategoryRepository.findByCategory(category, pageable);
        return list.map(UserCategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserCategoryDto> findByUser(User user, Pageable pageable) {
        Page<UserCategory> list = userCategoryRepository.findByUser(user, pageable);
        return list.map(UserCategoryDto::new);
    }


}