package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.enums.Season;
import com.pasifcode.caxias_diary.domain.enums.Status;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


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

    @Lob
    private byte[] image;

    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    @Enumerated(EnumType.STRING)
    private Season season;

    @Enumerated(EnumType.STRING)
    private Status status;



    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "event")
    private final Set<EventUser> eventUsers = new HashSet<>();

    @OneToMany(mappedBy = "event")
    private final Set<EventCategory> eventCategories = new HashSet<>();

    public Event() {
    }

    public Event(Long id, String title, String description, LocalDate date, byte[] image, Season season, Status status, Project project) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.image = image;
        this.season = season;
        this.status = status;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
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