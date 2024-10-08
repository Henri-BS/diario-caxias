package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.entity.Post;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PostService {

    List<Post> findAll();

    Post savePost(MultipartFile file, String title, String description) throws IOException;

    Optional<Post> getImage(Long id);
}
