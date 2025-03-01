package com.pasifcode.caxias_diary.domain.entity;

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

    private String password;

    private String image;

    private String coverImage;

    @Column(columnDefinition = "TEXT")
    private String userBio;

    private String userLocation;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @OneToMany(mappedBy = "user")
    private final Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<ItemDetails> itemDetails = new HashSet<>();

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

    public String getUserBio() {
        return userBio;
    }

    public void setUserBio(String userBio) {
        this.userBio = userBio;
    }

    public String getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(String userLocation) {
        this.userLocation = userLocation;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Set<EventUser> getEventUsers() {
        return eventUsers;
    }

    public Set<UserCategory> getUserCategory() {
        return userCategory;
    }

}