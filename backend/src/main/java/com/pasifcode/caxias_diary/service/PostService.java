package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.PostDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {

    Page<PostDto> findAll(Pageable pageable);

    List<PostDto> findByUser(User user);

    PostDto findById(Long id);

    PostDto savePost(PostDto dto);

    PostDto updatePost(PostDto dto);

    void deletePost(Long id);
}
