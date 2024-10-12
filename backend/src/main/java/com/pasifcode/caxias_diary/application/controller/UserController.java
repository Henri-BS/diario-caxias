package com.pasifcode.caxias_diary.application.controller;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.CredentialsDto;
import com.pasifcode.caxias_diary.domain.dto.UserDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.Optional;

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
        Page<User> list = userService.findAll(pageable);
        Page<UserDto> users = list.map(user -> {
            URI url = buildImageURL(user);
            return new UserDto(user, url.toString());
        });
        return ResponseEntity.ok(users);
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

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(token);
    }

    @PutMapping("/info/{id}")
    public ResponseEntity<UserDto> saveUserInfo(
            @RequestParam MultipartFile file,
            @RequestParam String bio,
            @RequestParam String location,
            @PathVariable Long id) throws IOException {
        User userInfo = userService.saveUserInfo(file, bio, location, id);
        URI userInfoUrl = buildImageURL(userInfo);
        return ResponseEntity.created(userInfoUrl).build();
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long id) {
        Optional<User> possibleImage = userService.getUserImage(id);

        if(possibleImage.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        User userImage = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(userImage.getExtension().getMediaType());
        headers.setContentDispositionFormData("inline; filename=\"" + userImage.getFileName() + "\"", userImage.getFileName());
        return new ResponseEntity<>(userImage.getImage(), headers, HttpStatus.OK);
    }

    private URI buildImageURL(User user) {
        String path = "/image/" + user.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(path)
                .build().toUri();
    }
}