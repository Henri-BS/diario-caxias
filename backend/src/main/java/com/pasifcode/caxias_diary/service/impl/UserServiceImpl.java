package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.repository.UserRepository;
import com.pasifcode.caxias_diary.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Transactional(readOnly = true)
    public Page<UserDto> findAll(String firstName, String lastName, Pageable pageable) {
        Page<User> page = userRepository.findAll(firstName, lastName, pageable);
        return page.map(UserDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto findUserById(Long id) {
        User find = userRepository.findById(id).orElseThrow();
        return new UserDto(find);
    }

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
        user.setImage(dto.getImage());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return new UserDto(userRepository.save(user));
    }
}
