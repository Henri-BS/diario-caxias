package com.pasifcode.caxias_diary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pasifcode.caxias_diary.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String body;
    private String image;
    private Long userId;
    private String userFirstName;
    private String userLastName;

    public PostDto(Post entity) {
        id = entity.getId();
        title = entity.getTitle();
        body = entity.getBody();
        image = entity.getImage();
        userId = entity.getUser().getId();
        userFirstName = entity.getUser().getFirstName();
    userLastName =entity.getUser().getLastName();
    }
}
