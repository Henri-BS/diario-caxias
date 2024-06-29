package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.PostDto;
import com.pasifcode.caxias_diary.entity.Post;
import com.pasifcode.caxias_diary.entity.User;
import com.pasifcode.caxias_diary.repository.PostRepository;
import com.pasifcode.caxias_diary.repository.UserRepository;
import com.pasifcode.caxias_diary.service.interf.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository PostRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<PostDto> findAllPosts(String title, Pageable pageable) {
        Page<Post> find = PostRepository.findAllPosts(title, pageable);
        return find.map(PostDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public PostDto findPostById(Long id) {
        Post find = PostRepository.findById(id).orElseThrow();
        return new PostDto(find);
    }


    @Override
    public PostDto savePost(PostDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Post add = new Post();
        add.setTitle(dto.getTitle());
        add.setBody(dto.getBody());
        add.setImage(dto.getImage());
        add.setUser(user);
        return new PostDto(PostRepository.saveAndFlush(add));
    }

    @Override
    public PostDto updatePost(PostDto dto) {
        Post edit = PostRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getTitle());
        edit.setImage(dto.getImage());
        edit.setBody(dto.getBody());
        return new PostDto(PostRepository.save(edit));
    }

    @Override
    public void deletePost(Long id) {
        this.PostRepository.deleteById(id);
    }
}
