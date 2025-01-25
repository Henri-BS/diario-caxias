package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_user_category")
public class UserCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public UserCategory() {
    }

    public UserCategory(Long id, User user, Category category) {
        this.id = id;
        this.user = user;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
