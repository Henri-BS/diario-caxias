package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="tb_post")
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    private LocalDateTime uploadDate = LocalDateTime.now();

    private String image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post")
    private Set<ProjectPost> projectPost = new HashSet<>();

    public Set<ProjectPost> getProjectPost() {
        return projectPost;
    }

    public void setProjectPost(Set<ProjectPost> projectPost) {
        this.projectPost = projectPost;
    }

    public Post() {
    }

    public Post(Long id, String title, String description, LocalDateTime uploadDate, String image, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.uploadDate = uploadDate;
        this.image = image;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
