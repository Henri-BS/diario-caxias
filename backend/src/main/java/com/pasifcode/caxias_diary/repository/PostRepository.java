package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

    @Query("SELECT obj FROM Post obj WHERE UPPER(obj.title)" +
            " LIKE UPPER(CONCAT('%', ?1, '%')) ORDER BY obj.title")
    Page<Post> findAllPosts(String title, Pageable pageable);
}