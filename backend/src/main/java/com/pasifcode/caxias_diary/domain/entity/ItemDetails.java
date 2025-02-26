package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ItemType;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_item_details")
public class ItemDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @Column(columnDefinition = "TEXT")
    private String itemDescription;

    @ManyToOne
    @JoinColumn(name = "project_id" )
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ItemDetails() {
    }

    public ItemDetails(Long id, ItemType itemType, String itemDescription, Project project, User user) {
        this.id = id;
        this.itemType = itemType;
        this.itemDescription = itemDescription;
        this.project = project;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ItemType getType() {
        return itemType;
    }

    public void setType(ItemType type) {
        this.itemType = type;
    }

    public String getDescription() {
        return itemDescription;
    }

    public void setDescription(String description) {
        this.itemDescription = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
