package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "tb_project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Lob
    private byte[] image;

    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    private Integer countEvents = 0;

    private Long countCategories;

    private Integer countUsers = 0;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project")
    private final Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private final Set<Event> events = new HashSet<>();


    public Project() {
    }

    public Project(Long id, String title, String body, byte[] image, Integer countEvents, Long countCategories, Integer countUsers, User user) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.image = image;
        this.countEvents = countEvents;
        this.countCategories = countCategories;
        this.countUsers = countUsers;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Set<Image> getImages() {
        return images;
    }

    public String getFileName(){
        return getTitle() + "." + getExtension();
    }
}
