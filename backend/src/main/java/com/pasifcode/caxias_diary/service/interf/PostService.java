package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PostService {
    Page<PostDto> findAllPosts(String title, Pageable pageable);

    PostDto findPostById(Long id);

    PostDto savePost(PostDto dto);

    PostDto updatePost(PostDto dto);

    void deletePost(Long id);
}