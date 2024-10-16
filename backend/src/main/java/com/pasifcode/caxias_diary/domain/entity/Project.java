package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tb_project")
@EntityListeners(AuditingEntityListener.class)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String body;

    private String image;

    private Integer countEvents = 0;

    private Long countCategories;

    private Integer countUsers = 0;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project")
    private final Set<ProjectPost> posts = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private final Set<Event> events = new HashSet<>();


    public Project() {
    }

    public Project(Long id, String title, String body, String image, Integer countEvents, Long countCategories, Integer countUsers, LocalDateTime createdDate, User user) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.image = image;
        this.countEvents = countEvents;
        this.countCategories = countCategories;
        this.countUsers = countUsers;
        this.createdDate = createdDate;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getCountEvents() {
        return countEvents;
    }

    public void setCountEvents(Integer countEvents) {
        this.countEvents = countEvents;
    }

    public Long getCountCategories() {
        return countCategories;
    }

    public void setCountCategories(Long countCategories) {
        this.countCategories = countCategories;
    }

    public Integer getCountUsers() {
        return countUsers;
    }

    public void setCountUsers(Integer countUsers) {
        this.countUsers = countUsers;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Event> getEvents() {
        return events;
    }


}
