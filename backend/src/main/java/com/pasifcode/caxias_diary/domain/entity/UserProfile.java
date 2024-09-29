package com.pasifcode.caxias_diary.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_user_profile")
@EntityListeners(AuditingEntityListener.class)
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_profile_id")
    private Long id;

    @Lob
    private byte[] image;

    @Enumerated
    private ImageExtension extension;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public UserProfile() {
    }

}