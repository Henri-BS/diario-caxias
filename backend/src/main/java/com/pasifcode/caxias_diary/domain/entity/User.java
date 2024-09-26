package com.pasifcode.caxias_diary.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_user")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @JsonIgnore
    private String password;

    private String role;

    @CreatedDate
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    private final Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<EventUser> eventUsers = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<UserCategory> userCategory = new HashSet<>();

    public User() {
    }

    public User(Long id, String username, String email, String image, String bio, String password, String role, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.image = image;
        this.bio = bio;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public Set<EventUser> getEventUsers() {
        return eventUsers;
    }

    public Set<UserCategory> getUserCategory() {
        return userCategory;
    }
}