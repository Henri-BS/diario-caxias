package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.PostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.repository.PostRepository;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly=true)
    public Page<PostDto> findAll(Pageable pageable){
         Page<Post> list = postRepository.findAll(pageable);
         return list.map(PostDto::new);
    }

    @Override
    public PostDto findById(Long id) {
        Post find = postRepository.findById(id).orElseThrow();
        return new PostDto(find);
    }

    @Override
    public PostDto savePost(PostDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Post add = new Post();
        add.setTitle(dto.getPostTitle());
        add.setSummary(dto.getPostSummary());
        add.setDescription(dto.getPostDescription());
        add.setImage(dto.getPostImage());
        add.setUser(user);

        return new PostDto(postRepository.saveAndFlush(add));
    }
}
