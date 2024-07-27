package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    private String image;

    private String email;

    private String password;

    private String role;

    @OneToMany(mappedBy = "user")
    private Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<EventUser> eventUsers = new HashSet<>();

    public User(Long id, String firstName, String lastName, String image, String email, String password, String role, Set<Project> projects, Set<EventUser> eventUsers) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.email = email;
        this.password = password;
        this.role = role;
        this.projects = projects;
        this.eventUsers = eventUsers;
    }

    public User() {
    }
}