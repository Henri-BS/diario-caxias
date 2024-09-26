package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.CredentialsDto;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @GetMapping("/list")
    public ResponseEntity<Page<UserDto>> findAllUsers(
            @RequestParam(defaultValue = "") String username,
            Pageable pageable
    ) {
        Page<UserDto> page = userService.findAllUsers(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {
        UserDto find = userService.findUserById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDto dto) {
        try {
            userService.saveUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicateTuplesException e) {
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody CredentialsDto credentialsDto) {
        var token = userService.authenticate(credentialsDto.getEmail(), credentialsDto.getPassword());

        if (token == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
return ResponseEntity.ok(token);
}
}