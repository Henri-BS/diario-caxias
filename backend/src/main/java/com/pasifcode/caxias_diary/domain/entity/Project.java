package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project")
    private final Set<ItemDetails> itemDetails = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private final Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private final Set<ProjectCategory> projectCategory = new HashSet<>();

    public Project() {
        super();
    }

    public Project(Long id, String title, String description, String image, LocalDateTime createdDate, User user) {
        super(title, description, image, createdDate);
        this.id = id;
        this.user = user;
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

}
