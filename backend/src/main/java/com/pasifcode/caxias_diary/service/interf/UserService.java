package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.entity.User;

public interface UserService {
    User findByEmail(String email);
    UserDto saveUser(UserDto dto);
}
