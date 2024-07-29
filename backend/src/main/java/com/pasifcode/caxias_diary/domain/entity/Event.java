package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.Season;
import com.pasifcode.caxias_diary.domain.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_event")
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
    private Season season;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "event")
    private Set<EventUser> eventUsers = new HashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<EventCategory> eventCategories = new HashSet<>();
}