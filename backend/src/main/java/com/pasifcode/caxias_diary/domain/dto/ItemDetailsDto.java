package com.pasifcode.caxias_diary.domain.dto;

import com.pasifcode.caxias_diary.domain.entity.ItemDetails;
import com.pasifcode.caxias_diary.domain.enums.ItemType;

import java.io.Serial;
import java.io.Serializable;

public class ItemDetailsDto implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;

    private Long id;
    private ItemType itemType;
    private String itemDescription;
    private Long projectId;
    private Long userId;

    public ItemDetailsDto() {
    }

    public ItemDetailsDto(ItemDetails entity) {
        id = entity.getId();
        itemType = entity.getType();
        itemDescription = entity.getDescription();
        projectId = entity.getProject().getId();
        userId = entity.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getUserId() {
        return userId;
    }
}
