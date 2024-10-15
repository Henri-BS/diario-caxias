package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.User;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;
    private String password;
    private String image;
    private String bio;
    private String location;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;

    public UserDto() {
    }

    public UserDto(User entity) {
        id = entity.getId();
        username = entity.getUsername();
        email = entity.getEmail();
        password = entity.getPassword();
        image = entity.getImage();
        bio = entity.getBio();
        location = entity.getLocation();
        createdDate = entity.getCreatedDate();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getImage() {
        return image;
    }

    public String getBio() {
        return bio;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
}
