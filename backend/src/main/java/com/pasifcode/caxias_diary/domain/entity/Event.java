package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.enums.Status;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tb_event")
@EntityListeners(AuditingEntityListener.class)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(unique = true)
    private String title;

    private String description;

    private LocalDate date;

    private String image;

    @Enumerated(EnumType.STRING)
    private ImageExtension extension;



    @Enumerated(EnumType.STRING)
    private Status status;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "event")
    private final Set<EventUser> eventUsers = new HashSet<>();

    @OneToMany(mappedBy = "event")
    private final Set<EventCategory> eventCategories = new HashSet<>();

    public Event() {
    }

    public Event(Long id, String title, String description, LocalDate date, String image, ImageExtension extension, Status status, LocalDateTime createdDate, Project project) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.image = image;
        this.extension = extension;
        this.status = status;
        this.createdDate = createdDate;
        this.project = project;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ImageExtension getExtension() {
        return extension;
    }

    public void setExtension(ImageExtension extension) {
        this.extension = extension;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
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

    public Set<EventUser> getEventUsers() {
        return eventUsers;
    }

    public Set<EventCategory> getEventCategories() {
        return eventCategories;
    }

    public String getFileName() {
        return getTitle().concat(".").concat(getExtension().name());
    }
}