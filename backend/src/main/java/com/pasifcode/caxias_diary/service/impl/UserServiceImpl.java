package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.application.security.AccessToken;
import com.pasifcode.caxias_diary.application.security.JwtHelper;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


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
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
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

    @Override
    public User saveUserInfo(MultipartFile file, String bio, String location, Long id) throws IOException {
        User userInfo = userRepository.findById(id).orElseThrow();

        userInfo.setImage(file.getBytes());
        userInfo.setBio(bio);
        userInfo.setLocation(location);
        userInfo.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        return userRepository.save(userInfo);
    }

    @Override
    public Optional<User> getUserImage(Long id) {
        return userRepository.findById(id);
    }
}
