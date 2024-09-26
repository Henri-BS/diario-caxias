package com.pasifcode.caxias_diary.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.domain.entity.User;

import java.io.Serial;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String image;
    private String email;
    private String password;

    public UserDto() {
    }

    public UserDto(User entity) {
        id = entity.getId();
        username = entity.getUsername();
        image = entity.getImage();
        email = entity.getEmail();
        password = entity.getPassword();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getImage() {
        return image;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
