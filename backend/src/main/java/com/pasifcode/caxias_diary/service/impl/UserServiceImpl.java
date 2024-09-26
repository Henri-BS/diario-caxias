package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.application.security.AccessToken;
import com.pasifcode.caxias_diary.application.security.JwtHelper;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.UserService;
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

    @Autowired
    private JwtHelper jwtHelper;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserDto> findAllUsers(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
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

        User add = new User();
        add.setEmail(dto.getEmail());
        add.setUsername(dto.getUsername());
        add.setImage(dto.getImage());
        add.setPassword(passwordEncoder.encode(dto.getPassword()));
        var getEmail = findByEmail(add.getEmail());
        if (getEmail != null) {
            throw new DuplicateTuplesException("Usuário já existe!");
        }
        return new UserDto(userRepository.save(add));
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        var user = findByEmail(email);
        if (user == null) {
            return null;
        }

        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if(matches){
            return jwtHelper.generateToken(user);
        }
        return null;
    }
}
