package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.application.security.AccessToken;
import com.pasifcode.caxias_diary.domain.dto.CredentialsDto;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDto>> findAllUsers(
            @RequestParam(defaultValue = "") String username,
            Pageable pageable
    ) {
        Page<UserDto> list = userService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {
        UserDto find = userService.findById(id);
        return ResponseEntity.ok(find);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDto dto) {
        try {
            userService.saveUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicateTuplesException e) {
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AccessToken> login(@RequestBody CredentialsDto credentialsDto) {
        AccessToken token = userService.authenticate(credentialsDto.getEmail(), credentialsDto.getPassword());

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(token);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto dto) {
        UserDto update = userService.updateUser(dto);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }
}