package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.application.security.AccessToken;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    Page<UserDto> findAllUsers(Pageable pageable);

    UserDto findUserById(Long id);

    User findByEmail(String email);

    UserDto saveUser(UserDto dto);

    AccessToken authenticate(String email, String password);
}
