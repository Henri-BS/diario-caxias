package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{

    @Query("SELECT obj FROM Project obj WHERE UPPER(obj.title)" +
            " LIKE UPPER(CONCAT('%', ?1, '%')) ORDER BY obj.title")
    Page<Project> findAllPosts(String title, Pageable pageable);

    List<Project> findByUser(User user);
}