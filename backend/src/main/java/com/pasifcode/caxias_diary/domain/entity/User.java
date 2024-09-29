package com.pasifcode.caxias_diary.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
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

    @JsonIgnore
    private String password;

    private String role;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;

    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();

    @Lob
    private byte[] image;

    @Enumerated
    private ImageExtension extension;

    @OneToMany(mappedBy = "user")
    private final Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<EventUser> eventUsers = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<UserCategory> userCategory = new HashSet<>();

    public User() {
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public ImageExtension getExtension() {
        return extension;
    }

    public void setExtension(ImageExtension extension) {
        this.extension = extension;
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

    public String getFileName() {
        return getUsername().concat(".").concat(getExtension().name());
    }
}