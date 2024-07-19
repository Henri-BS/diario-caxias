package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.entity.Post;
import com.pasifcode.caxias_diary.entity.PostCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostCategoryRepository extends JpaRepository<PostCategory, Long>{
    Page<PostCategory> findByPost(Post post, Pageable pageable);
}