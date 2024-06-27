package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.entity.User;
import com.pasifcode.caxias_diary.repository.UserRepository;
import com.pasifcode.caxias_diary.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto saveUser(UserDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return new UserDto(userRepository.save(user));
    }
}
