package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.PostCategoryDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface PostCategoryService {

    @Transactional(readOnly = true)
    Page<PostCategoryDto> findByPost(Project project, Pageable pageable);

    @Transactional(readOnly = true)
    PostCategoryDto findPostCategoryById(Long id);

    PostCategoryDto savePostCategory(PostCategoryDto dto);

    void deletePostCategory(Long id);
}
