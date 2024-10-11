package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.repository.PostRepository;
import com.pasifcode.caxias_diary.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    @Transactional(readOnly=true)
    public Page<Post> findAll(Pageable pageable){
         return postRepository.findAll(pageable);
    }

    @Override
    public Optional<Post> getImage(Long id) {
        return postRepository.findById(id);
    }


    @Override
    public Post savePost(MultipartFile file, String title, String description) throws IOException {
        Post add = new Post();
        add.setTitle(title);
        add.setDescription(description);
        add.setFile(file.getBytes());
        add.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        return postRepository.save(add);
    }



}
