package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{

    Page<Project> findByUser(User user, Pageable pageable);

    Project findByTitle(String title);
}