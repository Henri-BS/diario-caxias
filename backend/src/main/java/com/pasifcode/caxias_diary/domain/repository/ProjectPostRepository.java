package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.ProjectPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectPostRepository extends JpaRepository<ProjectPost, Long> {
    Page<ProjectPost> findByPost(Post post, Pageable pageable);

    Page<ProjectPost> findByProject(Project project, Pageable pageable);
}