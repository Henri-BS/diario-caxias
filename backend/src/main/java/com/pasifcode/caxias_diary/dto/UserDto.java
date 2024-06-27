package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public UserDto(User entity) {
        id = entity.getId();
        firstName = entity.getFirstName();
        lastName = entity.getLastName();
        email = entity.getEmail();
        password = entity.getPassword();
    }
}
