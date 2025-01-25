package com.pasifcode.caxias_diary.domain.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "tb_project_category")
public class ProjectCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_category_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public ProjectCategory() {
    }

    public ProjectCategory(Long id, Project project, Category category) {
        this.id = id;
        this.project = project;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
