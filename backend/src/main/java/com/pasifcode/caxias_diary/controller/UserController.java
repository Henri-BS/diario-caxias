package com.pasifcode.caxias_diary.controller;

import com.pasifcode.caxias_diary.dto.UserDto;
import com.pasifcode.caxias_diary.entity.User;
import com.pasifcode.caxias_diary.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user/list")
    public ResponseEntity<Page<UserDto>> findAll(
            @RequestParam(defaultValue = "") String firstName,
            @RequestParam(defaultValue = "") String lastName,
            Pageable pageable
            ){
        Page<UserDto> page = userService.findAll(firstName, lastName, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {
        UserDto find = userService.findUserById(id);
        return ResponseEntity.ok(find);
    }

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
