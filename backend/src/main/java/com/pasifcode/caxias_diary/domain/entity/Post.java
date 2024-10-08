package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
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

    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    @Lob
    private byte[] file;

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

    public Post(Long id, String title, String description, LocalDateTime uploadDate, ImageExtension extension, byte[] file) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.uploadDate = uploadDate;
        this.extension = extension;
        this.file = file;
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

    public ImageExtension getExtension() {
        return extension;
    }

    public void setExtension(ImageExtension extension) {
        this.extension = extension;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }


    public String getFileName(){
        return getTitle().concat(".").concat(getExtension().name());
    }
}
