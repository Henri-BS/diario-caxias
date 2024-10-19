package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tb_project")
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    private Integer countEvents;

    private Integer countUsers;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project")
    private final Set<ProjectPost> posts = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private final Set<Event> events = new HashSet<>();


    public Project() {
        super();
    }

    public Project(Long id, String title, String description, String image, Integer countEvents, Integer countUsers, LocalDateTime createdDate, User user) {
        super(title, description, image, createdDate);
        this.id = id;
        this.countEvents = countEvents;
        this.countUsers = countUsers;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCountEvents() {
        return countEvents;
    }

    public void setCountEvents(Integer countEvents) {
        this.countEvents = countEvents;
    }

    public Integer getCountUsers() {
        return countUsers;
    }

    public void setCountUsers(Integer countUsers) {
        this.countUsers = countUsers;
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
