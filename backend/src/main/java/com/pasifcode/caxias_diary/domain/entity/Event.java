package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.Status;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tb_event")
public class Event extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    private LocalDate eventDate;

    @Enumerated(EnumType.STRING)
    private Status eventStatus;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "event")
    private final Set<EventPost> eventPosts = new HashSet<>();


    @OneToMany(mappedBy = "event")
    private final Set<EventUser> eventUsers = new HashSet<>();

    public Event() {
    }

    public Event(Long id, String title, String description, LocalDate eventDate, String image, Status eventStatus, LocalDateTime createdDate, Project project) {
        super(title, description, image, createdDate);
        this.id = id;
        this.eventDate = eventDate;
        this.eventStatus = eventStatus;
        this.project = project;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public Status getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(Status eventStatus) {
        this.eventStatus = eventStatus;
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