package com.pasifcode.caxias_diary.service.interf;

import com.pasifcode.caxias_diary.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProjectService {
    Page<ProjectDto> findAllPosts(String title, Pageable pageable);

    List<ProjectDto> findByUser(User user);

    ProjectDto findPostById(Long id);

    ProjectDto savePost(ProjectDto dto);

    ProjectDto updatePost(ProjectDto dto);

    void deletePost(Long id);
}
