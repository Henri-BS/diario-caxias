package com.pasifcode.caxias_diary.domain.entity;

import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="tb_image")
@EntityListeners(AuditingEntityListener.class)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    private String title;

    private Long size;

    @CreatedDate
    private LocalDateTime uploadDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    @Lob
    private byte[] file;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Image() {
    }

    public Image(Long id, String title, Long size, LocalDateTime uploadDate, ImageExtension extension, byte[] file) {
        this.id = id;
        this.title = title;
        this.size = size;
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

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getFileName(){
        return getTitle().concat(".").concat(getExtension().name());
    }
}
