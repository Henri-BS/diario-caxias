package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface PostService {

    Page<Post> findAll(Pageable pageable);

    Post savePost(MultipartFile file, String title, String description) throws IOException;

    Optional<Post> getImage(Long id);
}
