package com.pasifcode.caxias_diary.domain.dto;

import com.pasifcode.caxias_diary.domain.entity.UserCategory;

public class UserCategoryDto {
    private Long id;
    private Long userId;
    private String username;
    private String userImage;
    private Long categoryId;
    private String categoryName;

    public UserCategoryDto() {
    }

    public UserCategoryDto(UserCategory entity) {
        id = entity.getId();
        userId = entity.getUser().getId();
        username = entity.getUser().getUsername();
        userImage = entity.getUser().getImage();
        categoryId = entity.getCategory().getId();
        categoryName = entity.getCategory().getName();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getUserImage() {
        return userImage;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
