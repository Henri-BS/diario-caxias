package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.entity.User;
import com.pasifcode.caxias_diary.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody UserDto dto) {
        User existingUser = userService.findByEmail(dto.getEmail());
        if (existingUser != null) {
            return "Email já cadastrado";
        }
        userService.saveUser(dto);
        return "Cadastrado";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDto dto) {
        User existingUser = userService.findByEmail(dto.getEmail());
        if (existingUser != null && passwordEncoder.matches(dto.getPassword(), existingUser.getPassword())) {
            return "Conectado";
        } else {
            return "Dados inválidos";
        }
    }
}
