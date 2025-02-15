package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Page<PostDto> findAll(Pageable pageable);

    PostDto findById(Long id);

    PostDto savePost(PostDto dto);

    PostDto updatePost(PostDto dto);
}
