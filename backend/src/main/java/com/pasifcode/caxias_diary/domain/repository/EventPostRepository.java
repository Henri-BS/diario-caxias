package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.EventPost;
import java.util.List;

import com.pasifcode.caxias_diary.domain.entity.Post;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventPostRepository extends JpaRepository<EventPost, Long> {

    List<EventPost> findAll(Specification<EventPost> spec);


    List<EventPost> findByEventAndPost(Event event, Post post);
}