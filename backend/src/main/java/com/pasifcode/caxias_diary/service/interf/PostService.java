package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.PostDto;
import com.pasifcode.caxias_diary.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface PostService {
    Page<PostDto> findAllPosts(String title, Pageable pageable);

    List<PostDto> findByUser(User user);

    PostDto findPostById(Long id);

    PostDto savePost(PostDto dto);

    PostDto updatePost(PostDto dto);

    void deletePost(Long id);
}
