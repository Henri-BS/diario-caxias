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

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<PostDto> findAllPosts(String title, Pageable pageable) {
        Page<Post> find = postRepository.findAllPosts(title, pageable);
        return find.map(PostDto::new);
    }


    @Override
    @Transactional(readOnly = true)
    public List<PostDto> findByUser(User user) {
        List<Post> list = postRepository.findByUser(user);
        return list.stream().map(PostDto::new).toList();
    }


    @Override
    @Transactional(readOnly = true)
    public PostDto findPostById(Long id) {
        Post find = postRepository.findById(id).orElseThrow();
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
        return new PostDto(postRepository.saveAndFlush(add));
    }

    @Override
    public PostDto updatePost(PostDto dto) {
        Post edit = postRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getTitle());
        edit.setImage(dto.getImage());
        edit.setBody(dto.getBody());
        return new PostDto(postRepository.save(edit));
    }

    @Override
    public void deletePost(Long id) {
        this.postRepository.deleteById(id);
    }
}
