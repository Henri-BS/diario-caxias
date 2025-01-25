package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectPostService {
    Page<ProjectPostDto> findByPost(Post post, Pageable pageable);

    Page<ProjectPostDto> findByProject(Project project, Pageable pageable);
}
