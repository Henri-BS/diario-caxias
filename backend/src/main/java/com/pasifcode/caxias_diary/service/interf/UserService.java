package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    Page<UserDto> findAll(String firstName, String lastName, Pageable pageable);

    UserDto findUserById(Long id);

    User findByEmail(String email);

    UserDto saveUser(UserDto dto);

}
