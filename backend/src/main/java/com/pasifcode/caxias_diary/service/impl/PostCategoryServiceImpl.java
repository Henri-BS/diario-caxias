package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.PostCategoryDto;
import com.pasifcode.caxias_diary.entity.Category;
import com.pasifcode.caxias_diary.entity.PostCategory;
import com.pasifcode.caxias_diary.entity.Post;
import com.pasifcode.caxias_diary.repository.CategoryRepository;
import com.pasifcode.caxias_diary.repository.PostCategoryRepository;
import com.pasifcode.caxias_diary.repository.PostRepository;
;
import com.pasifcode.caxias_diary.service.interf.PostCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostCategoryServiceImpl implements PostCategoryService {

    @Autowired
    private PostCategoryRepository postCategoryRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<PostCategoryDto> findAllPostCategories(Post post, Pageable pageable) {
        Page<PostCategory> find = postCategoryRepository.findAllPostCategories(post, pageable);
        return find.map(PostCategoryDto::new);
    }

    @Override
    @Transactional(readOnly = true)
    public PostCategoryDto findPostCategoryById(Long id) {
        PostCategory find = postCategoryRepository.findById(id).orElseThrow();
        return new PostCategoryDto(find);
    }

    @Override
    public PostCategoryDto savePostCategory(PostCategoryDto dto) {
        Post post = postRepository.findById(dto.getId()).orElseThrow();
        Category category = categoryRepository.findById(dto.getId()).orElseThrow();

        PostCategory add = new PostCategory();
        add.setPost(post);
        add.setCategory(category);
        return new PostCategoryDto(postCategoryRepository.saveAndFlush(add));
    }

    @Override
    public void deletePostCategory(Long id) {
        this.postCategoryRepository.deleteById(id);
    }
}
