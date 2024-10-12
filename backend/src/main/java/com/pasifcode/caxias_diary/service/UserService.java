package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.application.security.AccessToken;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface UserService {
    Page<User> findAll(Pageable pageable);

    UserDto findUserById(Long id);

    User findByEmail(String email);

    UserDto saveUser(UserDto dto);

    AccessToken authenticate(String email, String password);

    User saveUserInfo(MultipartFile file, String bio, String location, Long id) throws IOException;

    Optional<User> getUserImage(Long id);
}
